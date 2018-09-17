// Configuration
import { $app } from '@configuration';

// Utils
import { getYear, getMonth, getDay, now } from '@utils/date';
import { forEach, keys, parseObject } from '@utils/object';
import { getCurrentApp } from '@utils/url';

// Helpers
import * as Model from '@helpers/model';
import { getPaginationLimit } from '@helpers/pagination';

const utils = {
  getYear,
  getMonth,
  getDay,
  now
};

export default (req, res, next) => {
  let currentApp = getCurrentApp(req.originalUrl, true);
  const app = $app().allowed[currentApp];

  if (!app || !app.backend) {
    return next();
  }

  const { schema } = app;

  // * Global vars
  let table = currentApp;
  const { fields } = schema;
  let order = 'id desc';
  const searchBy = fields.split(', ');
  const filename = 'dashboard.model.js';

  // * Required fields
  res.content('Dashboard.forms.fields.error', true);

  // * Hidden and required Elements
  const hiddenElements = {};
  const requiredFields = {};

  const getRequiredFields = schema => {
    if (schema.required) {
      schema.required.split(', ').forEach(field => {
        requiredFields[field] = res.content(field);
      });
    }
  };

  const getHiddenElements = schema => {
    if (schema.hidden) {
      schema.hidden.split(', ').forEach(field => {
        const [hiddenField, method] = field.split(':');

        hiddenElements[hiddenField] = '';

        if (method) {
          hiddenElements[hiddenField] = utils[method]();
        }
      });
    }
  };

  getRequiredFields(schema);
  getHiddenElements(schema);

  // Response data for table schema
  const resData = {
    __: res.__,
    basePath: req.basePath,
    currentDashboardApp: res.currentDashboardApp
  };

  let validateIfExists = () => false;

  // * Validate if exists
  if (schema.validation) {
    validateIfExists = data => {
      const fields = {};

      schema.validation.split(', ').forEach(field => {
        fields[field] = data[field];
      });

      if (currentApp === 'content') {
        delete fields.value;
      }

      return fields;
    };
  }

  function dashboard(application) {
    if (application) {
      const { schema } = $app().allowed[currentApp];
      currentApp = application;
      getRequiredFields(schema);
    }

    function count(cb) {
      Model.countAllRowsFrom({ table }, total => cb(total));
    }

    function deleteAction(rows, cb) {
      Model.deleteRows(table, rows, () => cb());
    }

    function deleteRow(id, cb) {
      Model.deleteRow(table, id, () => cb());
    }

    function getRows(total = null, cb) {
      let limit;

      if (total !== null) {
        limit = getPaginationLimit(req.params, total);
      }

      const data = {
        table,
        fields,
        order,
        limit,
        debug: {
          filename: __filename,
          method: 'getRows'
        }
      };

      Model.findAll(data, result => {
        const tableSchema = Model.getTableSchema(result, resData, total);

        return total !== null ? cb(tableSchema) : cb(result);
      });
    }

    function getRow(id, cb) {
      const data = {
        table,
        id,
        debug: {
          filename: __filename,
          method: 'getRow'
        }
      };

      Model.find(data, result => cb(parseObject(result[0])));
    }

    function getSchema(cb) {
      const data = {
        table,
        requiredFields,
        hiddenElements
      };

      Model.getSchemaFrom(data, cb, (schema, noRender, cb) => cb(schema));
    }

    function removeAction(rows, cb) {
      Model.removeRows(table, rows, () => cb());
    }

    function removeRow(id, cb) {
      Model.removeRow(table, id, () => cb(true));
    }

    function restoreAction(rows, cb) {
      Model.restoreRows(table, 'Active', rows, () => cb());
    }

    function restoreRow(id, cb) {
      Model.restoreRow(table, 'Active', id, () => cb());
    }

    function saveRow(data, cb) {
      const fields = keys(data);
      let save = true;
      const errorMessages = {};

      table = application || table;

      const enoughFields = keys(requiredFields).filter(x => !fields.includes(x));

      if (enoughFields.length === 0) {
        forEach(fields, field => {
          if (requiredFields[field] && data[field] === '') {
            save = false;
            errorMessages[field] = requiredFields[field];
          }
        });
      } else {
        save = false;
        errorMessages.error = `Missing fields: ${enoughFields.toString()}`;
      }

      if (save) {
        Model.existsRow(table, validateIfExists(data), exists => {
          if (!exists) {
            return Model.insertRow(table, data, cb, (result, cb) => cb(result, {}));
          } else {
            return cb(false, 'exists');
          }
        });
      } else {
        return cb(false, errorMessages);
      }
    }

    function search(searchTerm, cb) {
      const data = {
        table,
        fields,
        searchBy,
        searchTerm,
        debug: {
          filename,
          method: 'dashboard.search'
        }
      };

      Model.search(data, result => {
        const tableSchema = Model.getTableSchema(result, resData, result.length);

        return cb(tableSchema);
      });
    }

    function updateRow(data, cb) {
      const { id = res.currentId } = data;

      if (data.id) {
        delete data.id;
      }

      const fields = keys(data);
      let edit = true;
      const errorMessages = {};
      const validateIfExists = {
        id
      };

      // Removing year, month and day for blog
      if (currentApp === 'blog') {
        if (data.year && data.month && data.day) {
          delete data.year;
          delete data.month;
          delete data.day;
        }
      }

      // Looking for errors
      forEach(fields, field => {
        if (requiredFields[field] && data[field] === '') {
          edit = false;
          errorMessages[field] = requiredFields[field];
        }
      });

      if (edit) {
        Model.existsRow(table, validateIfExists, exists => {
          if (exists) {
            return Model.updateRow(
              table,
              data,
              id,
              cb,
              (result, cb) => cb(result)
            );
          } else {
            return cb(false, 'exists');
          }
        });
      } else {
        return cb(false, errorMessages);
      }
    }

    return {
      count,
      deleteAction,
      deleteRow,
      getRows,
      getRow,
      getSchema,
      removeAction,
      removeRow,
      restoreAction,
      restoreRow,
      saveRow,
      search,
      updateRow
    };
  }

  function cms(application) {
    function count(data, cb) {
      Model.countAllRowsFrom({ table, ...data }, total => cb(total));
    }

    function get(requestData, cb) {
      const {
        params: {
          order: orderDirection = 'desc',
          orderBy = false,
          page,
          total = 0,
          all = false,
          fields = '*'
        },
        query
      } = requestData;

      const limit = !all ? getPaginationLimit(page, total) : '';

      if (orderBy) {
        order = `${orderBy} ${orderDirection}`;
      }

      const data = {
        table: application,
        fields,
        order,
        limit,
        query,
        debug: {
          filename: __filename,
          method: 'get'
        }
      };

      Model.findByQuery(data, result => cb(result));
    }

    function search(requestData, cb) {
      const {
        searchBy,
        searchTerm,
        fields = '*',
        params: {
          page,
          total = 0,
          all = false,
          order: orderDirection = 'desc',
          orderBy = false
        }
      } = requestData;

      const limit = !all ? getPaginationLimit(page, total) : '';

      if (orderBy) {
        order = `${orderBy} ${orderDirection}`;
      }

      const data = {
        table: application,
        fields,
        searchBy: [searchBy],
        searchTerm,
        order,
        limit,
        debug: {
          filename,
          method: 'search'
        }
      };

      Model.search(data, result => cb(result));
    }

    return {
      count,
      get,
      search
    };
  }

  // Methods
  res.dashboardModel = {
    cms,
    dashboard
  };

  return next();
};

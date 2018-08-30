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
  const currentApp = getCurrentApp(req.originalUrl, true);
  const app = $app().allowed[currentApp];

  if (!app || !app.backend) {
    return next();
  }

  const { schema } = app;

  // * Global vars
  const table = currentApp;
  const { fields } = schema;
  const order = 'id desc';
  const searchBy = fields.split(', ');
  const filename = 'dashboard.model.js';

  // * Required fields
  res.content('Dashboard.forms.fields.error', true);

  const requiredFields = {};

  if (schema.required) {
    schema.required.split(', ').forEach(field => {
      requiredFields[field] = res.content(field);
    });
  }

  // * Hidden Elements
  const hiddenElements = {};

  if (schema.hidden) {
    schema.hidden.split(', ').forEach(field => {
      const [hiddenField, method] = field.split(':');

      hiddenElements[hiddenField] = '';

      if (method) {
        hiddenElements[hiddenField] = utils[method]();
      }
    });
  }

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

  function dashboard() {
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
          filename,
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
          filename,
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
      Model.removeRow(table, id, () => cb());
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

      forEach(fields, field => {
        if (requiredFields[field] && data[field] === '') {
          save = false;
          errorMessages[field] = requiredFields[field];
        }
      });

      if (save) {
        Model.existsRow(table, validateIfExists(data), exists => {
          if (!exists) {
            return Model.insertRow(table, data, cb, (result, cb) => cb(result));
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
      const fields = keys(data);
      let edit = true;
      const errorMessages = {};
      const validateIfExists = {
        id: res.currentId
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
              res.currentId,
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

  // Methods
  res.dashboardModel = {
    dashboard
  };

  return next();
};

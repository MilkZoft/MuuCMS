// Helpers
import * as Db from './db/mysql';

// Utils
import { isDefined } from '../utils/is';
import { content, exists, forEach, keys, parseObject } from '../utils/object';

/**
 * Performs a SQL Query
 *
 * @param {string} sql SQL Query
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function executeQuery(sql, callback) {
  return Db.query(sql, callback);
}

/**
 * Performs a SQL Query and returns a callback
 *
 * @param {string} sql SQL Query
 * @param {function} callback Callback
 * @param {function} fn Callback
 * @returns {callback} Callback
 */
export function query(sql, callback, fn) {
  return executeQuery(sql, (error, result) => {
    // handle possible exceptions when parsing a json
    try {
      const response = parseObject(result);

      if (response && (response.insertId || response.affectedRows === 1 && sql.includes('UPDATE'))) {
        return fn(true, callback);
      }

      return fn(response && response.length > 0 ? response : false, callback);
    } catch (error) {
      console.error('Error when parsingObject ', error); // eslint-disable-line no-console
    }
  });
}

export function executeQueryAsync(sql) {
  return new Promise((resolve, reject) => {
    Db.query(sql, (err, result) => {
      if (err) reject(err);
      const response = parseObject(result);
      resolve(response);
    });
  });
}

export async function queryAsync(sql) {
  try {
    const resultFromQuery = await executeQueryAsync(sql);
    return resultFromQuery;
  } catch (error) {
    return { error };
  }
}

/**
 * Returns the count of rows from specific table
 *
 * @param {object} data Includes table name and more optional variables
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function countAllRowsFrom(data, callback) {
  const sql = Db.getCountAllRowsQuery(data);

  return query(
    sql,
    callback,
    (result, fn) => fn(result ? result[0].Total : 0)
  );
}

/**
 * Delete a row
 *
 * @param {string} table Table name
 * @param {number} id ID
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function deleteRow(table, id, callback) {
  const sql = Db.getDeleteQuery(table, id);

  return query(sql, callback, (result, fn) => fn(result));
}

/*
 * Delete multiple rows
 *
 * @param {string} table Table name
 * @param {array} rows Rows
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function deleteRows(table, rows, callback) {
  const sql = Db.getDeleteRowsQuery(table, rows);

  return query(sql, callback, (result, fn) => fn(result));
}

/**
 * Validates if a row exists
 *
 * @param {string} table Table name
 * @param {object} data Data
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function existsRow(table, data, callback) {
  if (!data) {
    return callback(false);
  }

  const { condition = 'AND' } = data;

  delete data.condition;

  const sql = Db.getExistsQuery(table, data, condition);

  return query(sql, callback, (result, fn) => fn(result));
}

/**
 * Find a row by id
 *
 * @param {object} data Data
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function find(data, callback) {
  const sql = Db.find(data);

  return query(sql, callback, (result, fn) => fn(result));
}

/**
 * Find all rows by table
 *
 * @param {object} data Data
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function findAll(data, callback) {
  const sql = Db.findAll(data);

  return query(sql, callback, (result, fn) => fn(result));
}

/**
 * Find rows by Query
 *
 * @param {object} data Data
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function findByQuery(data, callback) {
  const sql = Db.findByQuery(data);

  return query(sql, callback, (result, fn) => fn(result));
}

/**
 * Gets Columns Information
 *
 * @param {string} table Table
 * @param {function} callback Callback
 * @param {function} fn Callback
 * @returns {callback} Callback
 */
export function getColumns(table, callback, fn) {
  return query(`SHOW COLUMNS FROM ${table}`, callback, fn);
}

/**
 * Gets Schema from a given table
 *
 * @param {object} data Includes the table & ignoreFields
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function getSchemaFrom(data, callback) {
  const ignoreFields = data.ignoreFields || [];
  const requiredFields = keys(data.requiredFields) || [];
  const hiddenElements = data.hiddenElements || {};

  return getColumns(data.table, callback, (columns, fn) => {
    const schema = {};

    if (columns) {
      forEach(columns, column => {
        let props = {};
        const field = column.Field;
        const primaryKey = column.Key === 'PRI';
        const columnType = column.Type;
        const noRender = ignoreFields.indexOf(field) > -1 || primaryKey;
        const getInputInfo = () => {
          let inputType = 'input';
          let className = 'input';
          let options = '';
          const required = requiredFields.indexOf(field) !== -1
            ? data.requiredFields[field]
            : false;

          if (columnType.search('tinyint') > -1) {
            inputType = 'select';
            options = 'Dashboard.forms.fields.selects.decision';
            className = `select ${field}`;
          } else if (columnType.search('text') > -1) {
            inputType = 'textarea';
            className = `textarea editor ${field}`;
          } else if (columnType.search('datetime') > -1) {
            inputType = 'datapicker';
            className = `datapicker ${field}`;
          } else if (field === 'language' && columnType.search('varchar') > -1) {
            inputType = 'select';
            options = 'Dashboard.forms.fields.selects.languages';
            className = `select ${field}`;
          } else if (field === 'state') {
            inputType = 'select';
            options = 'Dashboard.forms.fields.selects.state';
            className = `select ${field}`;
          }

          return {
            inputType,
            options,
            className,
            required
          };
        };

        const inputInfo = getInputInfo();

        if (primaryKey) {
          props = {
            primaryKey,
            render: !noRender
          };
        } else if (noRender) {
          props = {
            render: !noRender
          };
        } else {
          props = {
            type: inputInfo.inputType,
            className: inputInfo.className,
            label: `Dashboard.forms.fields.${field}`,
            required: inputInfo.required,
            render: !noRender
          };
        }

        if (inputInfo.inputType === 'select') {
          props.options = inputInfo.options;
        }

        schema[field] = props;
      });
    }

    schema.hiddenElements = hiddenElements;

    return fn(schema);
  });
}

/**
 * Returns the schema from a table
 *
 * @param {object} data Data
 * @param {object} resData redData
 * @returns {object} Schema
 */
export function getTableSchema(data, resData, total) {
  const {
    __,
    basePath,
    currentDashboardApp
  } = resData;

  const tableSchema = {
    fields: {},
    data: [],
    __,
    total,
    basePath,
    currentDashboardApp
  };

  const centeredFields = ['id', 'author', 'state'];
  let firstTime = true;
  let center = false;

  forEach(data, row => {
    forEach(row, field => {
      if (firstTime) {
        center = exists(field, centeredFields);

        tableSchema.fields[field] = {
          center,
          label: content(`Dashboard.table.${field}`, __),
          key: `Dashboard.table.${field}`
        };
      }
    });

    const obj = parseObject(row);

    if (isDefined(obj.state)) {
      switch (obj.state) {
        case 'Deleted':
          obj.bg = 'danger';
          break;
        case 'Pending':
          obj.bg = 'info';
          break;
        case 'Inactive':
          obj.bg = 'warning';
          break;
        default:
        // Do nothing
      }
    }

    tableSchema.data.push(obj);
    firstTime = false;
  });

  return tableSchema;
}

/*
 * Insert a row
 *
 * @param {string} table Table name
 * @param {object} data Data
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function insertRow(table, data, callback) {
  const sql = Db.getInsertQuery(table, data);
  return query(sql, callback, (result, fn) => fn(result));
}
/*
 * Insert a row in db
 *
 * @param {string} table Table name
 * @param {object} data Data
 * @returns {Object,false} object with the result of the query or
 * false if there was an error
 */
export async function insertRowAsync(table, data) {
  const sql = Db.getInsertQuery(table, data);
  const result = await executeQueryAsync(sql);
  // validate response
  if (Object.keys(result).length && result.affectedRows > 0) {
    return { inserted: true, id: result.insertId };
  } else {
    return false;
  }
}

/**
 * Remove a row by id
 *
 * @param {string} table Table name
 * @param {number} id ID
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function removeRow(table, id, callback) {
  const sql = Db.getRemoveQuery(table, id);

  return query(sql, callback, (result, fn) => fn(result));
}

/**
 * Remove rows
 *
 * @param {string} table Table name
 * @param {array} rows Rows
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function removeRows(table, rows, callback) {
  const sql = Db.getRemoveRowsQuery(table, rows);

  return query(sql, callback, (result, fn) => fn(result));
}

/**
 * Restore row by id
 *
 * @param {string} table Table name
 * @param {string} state State
 * @param {number} id ID
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function restoreRow(table, state, id, callback) {
  const sql = Db.getRestoreQuery(table, state, id);

  return query(sql, callback, (result, fn) => {
    fn(result);
  });
}

/**
 * Restore rows
 *
 * @param {string} table Table name
 * @param {string} state State
 * @param {array} rows Rows
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function restoreRows(table, state, rows, callback) {
  const sql = Db.getRestoreRowsQuery(table, state, rows);

  return query(sql, callback, (result, fn) => callback(fn));
}

/**
 * Search rows
 *
 * @param {object} data Data
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function search(data, callback) {
  const sql = Db.getSearchQuery(data);
  return query(sql, callback, (result, fn) => fn(result));
}

export function searchAsync(data) {
  return new Promise(resolve => {
    const sql = Db.getSearchQuery(data);
    query(sql, result => resolve(result), (result, fn) => fn(result));
  });
}

/**
 * Update Row
 *
 * @param {string} table Table name
 * @param {object} data Data
 * @param {number} id ID
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function updateRow(table, data, id, callback) {
  const sql = Db.getUpdateQuery(table, data, id);

  return query(sql, callback, (result, fn) => fn(result));
}

export async function updateRowAsync(table, data, id) {
  const sql = Db.getUpdateQuery(table, data, id);
  try {
    const result = await executeQueryAsync(sql);
    return result;
  } catch (error) {
    console.log('Error updating a record:', error); // eslint-disable-line no-console

    return {
      error: true
    };
  }
}

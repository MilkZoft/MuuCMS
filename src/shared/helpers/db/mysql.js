// Dependencies
import mysql from 'mysql';

// Configuration
import { $db } from '@configuration';

// Utils
import { addSlashes } from '../../utils/string';
import { forEach, keys } from '../../utils/object';
import { isArray, isObject } from '../../utils/is';
import { debug } from '../../utils/debug';

// Database connection
const connection = mysql.createConnection({
  database: $db().mysql.database,
  host: $db().mysql.host,
  password: $db().mysql.password,
  port: $db().mysql.port,
  user: $db().mysql.user
});

connection.connect(error => {
  if (error) {
    console.error(`Error Connecting: ${error.stack}`); // eslint-disable-line no-console
    return false;
  }
});

/**
 * Builds a WHERE query
 *
 * @param {object} data Query Object
 * @param {string} condition Condition
 * @returns {string} SQL Query
 */
export function buildWhereQuery(data, condition = 'AND') {
  const count = keys(data).length - 1;
  let i = 0;
  let query = '';

  forEach(data, field => {
    if (i === count) {
      query += `${field} = '${data[field]}'`;
    } else {
      query += `${field} = '${data[field]}' ${condition} `;
    }

    i += 1;
  });

  return query;
}

/**
 * Builds the SQL Query
 *
 * @param {object} obj Query Object
 * @param {string} find Defines if want to find by "first" or "last"
 * @returns {string} SQL Query
 */
export function getQuery(obj, find) {
  const getFields = () => obj.fields || '*';
  const getTable = () => obj.table;
  const getGroup = () => obj.group && `GROUP BY ${obj.group}` || '';
  const getOrder = () => obj.order && `ORDER BY ${obj.order}` || '';
  const getLimit = () => obj.limit && `LIMIT ${obj.limit}` || '';
  const filename = () => obj.debug ? `==[FILENAME: ${obj.debug.filename}]==` : '';
  const method = () => obj.debug ? `==[METHOD: ${obj.debug.method}()]==` : '';

  let limit = getLimit();
  let order = getOrder();
  let where = '';

  // Find by id
  if (obj.id) {
    where = `WHERE id = ${obj.id}`;
  }

  // Find by field
  if (obj.field && obj.value) {
    where = `WHERE ${obj.field} = '${obj.value}'`;
  }

  // Find by SQL
  if (isObject(obj.query)) {
    where = `WHERE ${buildWhereQuery(obj.query)}`;
  } else if (obj.query) {
    where = `WHERE ${obj.query}`;
  }

  // Find first
  if (find) {
    limit = 'LIMIT 1';
  }

  if (find === 'last') {
    order = `ORDER BY ${obj.key} DESC `;
  }

  const query = `SELECT ${getFields()} FROM ${getTable()} ${where} ${getGroup()} ${order} ${limit}`;

  debug('mysql.js', 'getQuery', filename(), method(), query);

  return query;
}

/**
 * Find a row by id
 *
 * @param {object} obj Query Object
 * @returns {string} SQL Query
 */
export function find(obj) {
  if (!obj.id) {
    return false;
  }

  return getQuery(obj);
}

/**
 * Find All Rows
 *
 * @param {object} obj Query Object
 * @returns {string} SQL Query
 */
export function findAll(obj) {
  return getQuery(obj);
}

/**
 * Find a row by field
 *
 * @param {object} obj Query Object
 * @returns {string} SQL Query
 */
export function findBy(obj) {
  return getQuery(obj);
}

/**
 * Find a row by SQL Query
 *
 * @param {object} obj Query Object
 * @returns {string} SQL Query
 */
export function findByQuery(obj) {
  return getQuery(obj);
}

/**
 * Find first row
 *
 * @param {object} obj Query Object
 * @returns {string} SQL Query
 */
export function findFirst(obj) {
  return getQuery(obj, 'first');
}

/**
 * Find last row
 *
 * @param {object} obj Query Object
 * @returns {string} SQL Query
 */
export function findLast(obj) {
  if (!obj.key) {
    return false;
  }

  return getQuery(obj, 'last');
}

/**
 * Get the count of all rows
 *
 * @param {object} data Includes table name & more optional variables
 * @returns {string} SQL Query
 */
export function getCountAllRowsQuery(data) {
  const { table } = data;

  let query = `SELECT COUNT(1) AS Total FROM ${table} `;

  delete data.table;

  if (keys(data).length > 0) {
    query += `WHERE ${buildWhereQuery(data)}`;
  }

  debug('mysql.js', 'getCountAllRowsQuery', table, query);

  return query;
}

/**
 * Deletes a row logically
 *
 * @param {string} table table name
 * @param {number} id id
 * @returns {string} SQL Query
 */
export function getDeleteQuery(table, id) {
  const query = `UPDATE ${table} SET state = 'Deleted' WHERE id = ${id}`;

  debug('mysql.js', 'getDeleteQuery', table, id, query);

  return query;
}

/**
 * Deletes rows logically
 *
 * @param {string} table table name
 * @param {array} rows rows
 * @returns {string} SQL Query
 */
export function getDeleteRowsQuery(table, rows) {
  const ids = isArray(rows) ? rows.join(', ') : rows;
  const query = `UPDATE ${table} SET state = 'Deleted' WHERE id IN (${ids})`;

  debug('mysql.js', 'getDeleteRowsQuery', table, rows, ids, query);

  return query;
}

/**
 * Returns a SQL Query to valdiate if a row exists
 *
 * @param {string} table table name
 * @param {object} data data
 * @param {string} condition Condition
 * @returns {string} SQL Query
 */
export function getExistsQuery(table, data, condition) {
  if (table && data) {
    const query = `SELECT * FROM ${table} WHERE ${buildWhereQuery(data, condition)}`;

    debug('mysql.js', 'getExistsQuery', table, data, query);

    return query;
  }

  return false;
}

/**
 * Returns a SQL Query to insert a new row
 *
 * @param {string} table table name
 * @param {object} data data
 * @returns {string} SQL Query
 */
export function getInsertQuery(table, data) {
  if (isObject(data)) {
    const count = keys(data).length - 1;
    let fields = '';
    let values = '';
    let i = 0;

    forEach(data, f => {
      if (i === count) {
        fields += f;
        values += `'${addSlashes(data[f])}'`;
      } else {
        fields += `${f}, `;
        values += `'${addSlashes(data[f])}', `;
      }

      i += 1;
    });

    const query = `INSERT INTO ${table} (${fields}) VALUES (${values})`;

    debug('mysql.js', 'getInsertQuery', table, data, fields, values, query);

    return query;
  }

  return false;
}

/**
 * Returns a SQL Query to delete a row
 *
 * @param {string} table table name
 * @param {number} id id
 * @returns {string} SQL Query
 */
export function getRemoveQuery(table, id) {
  const query = `DELETE FROM ${table} WHERE id = ${id}`;

  debug('mysql.js', 'getRemoveQuery', table, id, query);

  return query;
}

/**
 * Returns a SQL Query to delete multi rows
 *
 * @param {string} table table name
 * @param {array} rows rows
 * @returns {string} SQL Query
 */
export function getRemoveRowsQuery(table, rows) {
  const ids = isArray(rows) ? rows.join(', ') : rows;
  const query = `DELETE FROM ${table} WHERE id IN (${ids})`;

  debug('mysql.js', 'getRemoveRowsQuery', table, rows, ids, query);

  return query;
}

/**
 * Returns a SQL Query to update a row
 *
 * @param {string} table table name
 * @param {string} state state
 * @param {number} id id
 * @returns {string} SQL Query
 */
export function getRestoreQuery(table, state, id) {
  const query = `UPDATE ${table} SET state = '${state}' WHERE id = ${id}`;

  debug('mysql.js', 'getRestoreQuery', table, state, id, query);

  return query;
}

/**
 * Returns a SQL Query to update multiple rows
 *
 * @param {string} table table name
 * @param {string} state state
 * @param {array} rows rows
 * @returns {string} SQL Query
 */
export function getRestoreRowsQuery(table, state, rows) {
  const ids = isArray(rows) ? rows.join(', ') : rows;
  const query = `UPDATE ${table} SET state = '${state}' WHERE id IN (${ids})`;

  debug('mysql.js', 'getRestoreRowsQuery', table, state, rows, ids, query);

  return query;
}

/**
 * Returns a SQL Query to search rows
 *
 * @param {object} data data
 * @param {function} callback callback
 * @returns {string} SQL Query
 */
export function getSearchQuery(data) {
  const getFields = () => data.fields || '*';
  const getTable = () => data.table;
  const getOrder = () => data.order && `ORDER BY ${data.order}` || '';
  const getLimit = () => data.limit && `LIMIT ${data.limit}` || '';
  const count = data.searchBy.length - 1;
  let where = 'WHERE (';
  let i = 0;
  const filename = () => data.debug ? `==[FILENAME: ${data.debug.filename}]==` : '';
  const method = () => data.debug ? `==[METHOD: ${data.debug.method}()]==` : '';

  forEach(data.searchBy, field => {
    if (i === count) {
      where += `${field} LIKE '%${data.searchTerm}%'`;
    } else {
      where += `${field} LIKE '%${data.searchTerm}%' OR `;
    }

    i += 1;
  });

  if (data.language) {
    where += ` AND language = '${data.language}'`;
  }

  if (data.state) {
    where += ` AND state = '${data.state}'`;
  }

  where += ')';

  const query = `SELECT ${getFields()} FROM ${getTable()} ${where} ${getOrder()} ${getLimit()}`;

  debug('mysql.js', 'getSearchQuery', filename(), method(), data, query);

  return query;
}

/**
 * Returns a SQL Query to delete multi rows
 *
 * @param {string} table table name
 * @param {object} data data
 * @param {number} id id
 * @returns {string} SQL Query
 */
export function getUpdateQuery(table, data, id) {
  if (isObject(data)) {
    const count = keys(data).length - 1;
    let values = '';
    let i = 0;

    forEach(data, f => {
      if (i === count) {
        values += `${f} = '${addSlashes(data[f])}'`;
      } else {
        values += `${f} = '${addSlashes(data[f])}', `;
      }

      i += 1;
    });

    if (id > 0) {
      const query = `UPDATE ${table} SET ${values} WHERE id = ${id}`;

      debug('mysql.js', 'getUpdateQuery', table, data, id, query);

      return query;
    }
  }

  return false;
}

/**
 * Executes a query
 *
 * @param {string} sql SQL Query
 * @param {function} callback Callback
 * @returns {object} SQL Object
 */
export function query(sql, callback) {
  return sql
    ? connection.query(sql, callback)
    : false;
}

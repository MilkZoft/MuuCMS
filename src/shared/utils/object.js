// Dependencies
import dot from 'dot-object';

// Utils
import { isArray, isDefined, isObject } from './is';

/**
 * Returns the object keys in an array
 *
 * @param {object} items Object
 * @returns {array} Keys in array
 */
export function keys(items) {
  return isObject(items) ? Object.keys(items) : false;
}

/**
 * Performs a forEach for Arrays or Objects
 *
 * @param {*} items Object || Array
 * @param {function} callback Callback
 * @returns {boolean} True if exists
 */
export function forEach(items, callback) {
  if (isDefined(items) && isDefined(items[0]) && isDefined(items[0].Field) || isArray(items)) {
    return items.forEach(callback);
  } else if (!isDefined(items)) {
    return false;
  }

  return isObject(items) ? keys(items).forEach(callback) : false;
}

/**
 * Return a value from a given dot notation string from object
 *
 * @param {string} key Dot notation key
 * @param {object} obj Object
 * @returns {mixed} Value
 */
export function pick(key, obj) {
  return dot.pick(key, obj) || key;
}

/**
 * Returns a JSON from a given JSON String dot notation (Node.child.grandchild)
 *
 * @param {array} nodes Content nodes
 * @param {boolean} raw Raw content
 * @returns {object} JSON Object
 * @memberof module:lib/utils/object
 */
export function buildContentJson(nodes, raw) {
  const rows = {};

  forEach(nodes, node => {
    rows[node.name] = node.value;
  });

  if (!raw) {
    dot.object(rows);
  }

  return rows;
}

/**
 * Returns a content value from given key
 *
 * @param {string} contentKey Key
 * @param {object} __ Content object
 * @returns {string} Content
 */
export function content(contentKey, __) {
  return pick(contentKey, __);
}

/**
 * Returns true if a key exists in a given array or object
 *
 * @param {string} key Key
 * @param {object} items Object
 * @returns {boolean} True if exists
 */
export function exists(key, items) {
  if (!isArray(items) && !isObject(items)) {
    return false;
  }

  if (isArray(items)) {
    return items.includes(key);
  }

  return keys(items).includes(key);
}

/**
 * Stringify && Parse an Object
 *
 * @param {object} obj Object
 * @returns {object} Parsed JSON
 */
export function parseObject(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    console.log('Error parsing object...'); // eslint-disable-line no-console
  }
}

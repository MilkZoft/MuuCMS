// Configuration
import { $languages } from '@configuration';

/**
 * Validates if a given variable is an Array
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is array
 */
export function isArray(variable) {
  return Array.isArray(variable);
}

/**
 * Validates if a given variable is defined
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is defined
 */
export function isDefined(variable) {
  return typeof variable !== 'undefined' && variable !== null;
}

/**
 * Validates if a given variable is a number
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is number
 */
export function isNumber(variable) {
  return typeof variable === 'number';
}

/**
 * Validates if a given variable is a valid email
 *
 * @param {string} email Email
 * @returns {boolean} True if is email
 */
export function isEmail(email) {
  return /(.+)@(.+){2,}\.(.+){2,}/.test(email);
}

/**
 * Validates if a given variable is a function
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is function
 */
export function isFunction(variable) {
  return typeof variable === 'function';
}

/**
 * Validates if a given string is a valid json
 *
 * @param {mixed} str JSON String
 * @returns {boolean} True if is valid json
 */
export function isJson(str) {
  if (str === null) {
    return false;
  }

  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}

/**
 * Validates if a given string is a valid language
 *
 * @param {string} language Language
 * @returns {boolean} True if is a valid language
 */
export function isLanguage(language) {
  return $languages().list.includes(language);
}

/**
 * Validates if a given variable is an object
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is object
 */
export function isObject(variable) {
  return isDefined(variable) && typeof variable === 'object' && !Array.isArray(variable);
}

/**
 * Validates if a given string is a valid password
 *
 * @param {string} password Password
 * @param {number} min Min length
 * @returns {boolean} True if is a valid password
 */
export function isPassword(password, min = 6) {
  return password.length >= min;
}

/**
 * Validates if a given variable is a string
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is string
 */
export function isString(variable) {
  return typeof variable === 'string';
}

/**
 * Validates if a given variable is undefined
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is undefined
 */
export function isUndefined(variable) {
  return typeof variable === 'undefined' || variable === null;
}

export function isBrowser() {
  return typeof window !== 'undefined';
}

// Utils
import { isString, isObject } from './is';
import { forEach } from './object';

/**
 * Adds back slashes to single and double quotes
 *
 * @param {string} str String
 * @returns {string} String with slashes.
 */
export function addSlashes(str) {
  return isString(str) ? str.replace(/'/g, '\\\'') : str;
}

/**
 * Converts a string to camelCase
 *
 * @param {string} str String
 * @returns {string} camelCase string.
 */
export function camelCase(str) {
  return str.replace(/^([A-Z])|[\s-_](\w)/g, (match, p1, p2) => p2.toUpperCase());
}

/**
 * Removes HTML from string
 *
 * @param {string} str String
 * @returns {string} Cleaned string.
 */
export function removeHTML(str) {
  return str.replace(/(<([^>]+)>)/ig, '');
}

/**
 * Cleans a string from special characters
 *
 * @param {string} str String
 * @returns {string} Cleaned string.
 */
export function clean(str) {
  return removeHTML(str).replace(/[`ª´·¨Ç~¿!#$%^&*()|+=?;'",<>{}[\]\\]/gi, '');
}

/**
 * Escapes a string
 *
 * @param {string} str String
 * @returns {string} Escaped string.
 */
export function escapeString(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Sanitizes a string
 *
 * @param {*} data String or object
 * @returns {*} sanitizedData
 */
export function sanitize(data) {
  const sanitizedData = {};

  if (isString(data)) {
    return clean(data);
  }

  if (isObject(data)) {
    forEach(data, key => {
      sanitizedData[key] = clean(data[key]);
    });

    return sanitizedData;
  }

  return false;
}

export function getFirstImageParagraph(html) {
  const paragraphs = html.split(/<p[^>]*>(.*?)<\/p>/).filter(paragraph => paragraph.length > 5);
  const image = paragraphs && paragraphs.length > 0
    ? paragraphs[0]
    : false;

  const imgRegex = /<img[^>]+src="(.+)"/g;
  const img = imgRegex.exec(image);
  const src = img === null ? '' : img[1].split('"')[0];

  return src;
}

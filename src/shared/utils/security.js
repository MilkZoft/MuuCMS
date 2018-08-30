// Dependencies
import crypto from 'crypto';

// Configuration
import { $security } from '@configuration';

// Secret Salt
const salt = $security().secret;

/**
 * Encrypt a string with md5
 *
 * @param {string} str String
 * @returns {string} Encrypted md5 string
 */
export function md5(str) {
  return crypto
    .createHash('md5')
    .update(`${salt}${str.toString()}`)
    .digest('hex');
}

/**
 * Encrypt a string with sha1
 *
 * @param {string} str String
 * @returns {string} Encrypted sha1 string
 */
export function sha1(str) {
  return crypto
    .createHash('sha1')
    .update(`${salt}${str.toString()}`)
    .digest('hex');
}

/**
 * Encrypt a string with sha1 & md5
 *
 * @param {string} str String
 * @returns {string} Encrypted sha1 string
 */
export function encrypt(str) {
  return sha1(md5(str));
}

/**
 * Generates a random code
 *
 * @param {number} max Max Size
 * @returns {string} Cleaned string.
 */
export function randomCode(max) {
  let code = '';
  let randomPoz;
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  max = max || 12;

  for (let i = 0; i < max; i += 1) {
    randomPoz = Math.floor(Math.random() * charset.length);
    code += charset.substring(randomPoz, randomPoz + 1);
  }

  return code;
}

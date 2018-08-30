// Dependencies
import http from 'http';
import https from 'https';

// Configuration
import { $baseUrl, $languages, $isLocal } from '@configuration';

// Utils
import { getParamsFromUrl } from '@utils/url';
import { isJson } from '@utils/is';

/**
 * Returns languages like string: 'es|en'
 *
 * @returns {string} languages
 */
export function availableLanguages() {
  return $languages().list.join('|');
}

/**
 * Returns default language
 *
 * @returns {string} Default language
 */
export function defaultLanguage() {
  return $languages().default;
}

/**
 * Checks if a given string is a valid language
 *
 * @param {string} lang Language
 * @returns {boolean} Returns true if is a valid language
 */
export function isLanguage(lang) {
  const currentLanguage = $languages().list.filter(language => language === lang);

  return currentLanguage.length > 0;
}

/**
 * Returns current language on the URL
 *
 * @param {string} url Current Url
 * @returns {string} Current language (en)
 */
export function getCurrentLanguage(url) {
  const params = getParamsFromUrl(url);

  return params && isLanguage(params[0]) ? params[0] : defaultLanguage();
}

/**
 * Returns current language as path on the URL
 *
 * @param {string} url Current Url
 * @returns {string} Current language path (/en)
 */
export function getLanguagePath(url) {
  const params = getParamsFromUrl(url);

  return isLanguage(params[0]) ? `/${params[0]}` : `/${defaultLanguage()}`;
}

/**
 * Loads a language json file
 *
 * @param {string} language Language
 * @param {function} callback Callback
 * @returns {object} Language json
 */
export function loadLanguage(language, callback) {
  if (!isLanguage(language)) {
    language = $languages().default;
  }

  const cb = res => {
    let rawData = '';

    res.setEncoding('utf8');

    res.on('data', chunk => rawData += chunk); // eslint-disable-line
    res.on('end', () => {
      if (isJson(rawData)) {
        return callback(JSON.parse(rawData));
      }

      return callback({});
    });
  };

  if ($isLocal()) {
    http.get(`${$baseUrl()}/content/${language}.json`, cb);
  } else {
    https.get(`${$baseUrl()}/content/${language}.json`, cb);
  }
}

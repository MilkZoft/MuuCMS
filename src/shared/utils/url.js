// Configuration
import { $app } from '@configuration';

// Utils
import { isDefined, isLanguage, isString } from './is';
import { getCurrentLanguage } from './i18n';
import { exists } from './object';

// Allowed Apps
const allowedApps = $app().allowed;

/**
 * Return the location
 *
 * @param {object} req Request
 * @returns {object} window.location
 */
export function getLocation(req) {
  return typeof window !== 'undefined' ? window.location : { pathname: req && req.url };
}

/**
 * Return all the params from the url (splits slashes)
 *
 * @param {string} url Url Params with slashes (/es/blog/post-title)
 * @param {number} index Get specific param
 * @returns {array} Params as array
 */
export function getParamsFromUrl(url, index = false) {
  if (url === true) {
    url = getLocation().pathname;
  }

  if (isString(url)) {
    if (url.indexOf('?') > -1) {
      url = url.substr(0, url.indexOf('?'));
    }

    const params = url.split('/');
    params.shift();

    if (params[params.length - 1] === '') {
      params.pop();
    }

    if (index) {
      if (isLanguage(params[0])) {
        index += 1;
      }

      return isDefined(params[index]) ? params[index] : false;
    }

    return params;
  }
}

export function isValidApp(app) {
  return exists(app, allowedApps);
}

/**
 * Return the current app
 *
 * @param {string} url URL
 * @param {boolean} dashboard Dashboard
 * @returns {string} Current App
 */
export function getCurrentApp(url, dashboard) {
  const urlParams = getParamsFromUrl(url);
  let currentApp = '';

  if (dashboard) {
    currentApp = isLanguage(urlParams[0]) && isDefined(urlParams[2]) ? urlParams[2] : urlParams[1];

    if (currentApp && currentApp.startsWith('?') || !currentApp) {
      currentApp = 'Home';
    }

    return currentApp;
  }

  currentApp = isLanguage(urlParams[0]) ? urlParams[1] : urlParams[0];

  return isValidApp(currentApp) ? currentApp : $app().default;
}

/**
 * Return a value from param
 *
 * @param {string} param Param
 * @param {string} type Type
 * @returns {string} Value
 */
export function getValueFromParam(param, type = 'string') {
  const value = param.replace('/', '');

  if (type === 'number') {
    return Number(value);
  }

  return value;
}

/**
 * Return the number page from param
 *
 * @param {object} params Param
 * @returns {number} Page
 */
export function getPaginationPageFromParam(params) {
  return isDefined(params.action) && params.action === 'page' && isDefined(params[0])
    ? getValueFromParam(params[0], 'number')
    : 0;
}

/**
 * Returns current language on the URL
 *
 * @param {object} req Request
 * @returns {string} Current language
 */
export function getLanguage(req) {
  const { pathname = '/' } = getLocation(req);

  return getCurrentLanguage(pathname);
}

/**
 * Return the current app
 *
 * @returns {string} app
 */
export function getCurrentFrontendApp() {
  const { pathname } = getLocation();

  return getCurrentApp(pathname);
}

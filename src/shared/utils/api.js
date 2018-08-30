// Dependencies
import axios from 'axios';
import queryString from 'query-string';

// Config
import { $api } from '@configuration';

/**
 * Returns the API Endpoint or a static JSON
 *
 * @param {string} endpoint Endpoint
 * @param {string} qs Query String (GET variables)
 * @returns {string} Endpoint or Static JSON
 */
export function apiEndpoint(endpoint, qs, external = false) {
  let query = '';

  if (qs) {
    query = `?${qs}`;
  }

  return !external
    ? endpoint
    : `${$api().url}${endpoint}${query}`;
}

/**
 * Returns an object with the fetch options (method, headers, body, etc.)
 *
 * @param {object} options Options
 * @returns {object} Options Object
 */
export function apiOptions(options = {}) {
  const {
    method = 'GET',
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body = false
  } = options;

  const newOptions = {
    method,
    headers,
    credentials: 'include'
  };

  if (method !== 'GET' && body) {
    newOptions.body = body;
  }

  return newOptions;
}

/**
 * Performs a fetch and returns a promise
 *
 * @param {string} endpoint Endpoint
 * @param {object} options Options
 * @param {string} query Query String (GET variables)
 * @returns {promise} Returns a Promise
 */
export function apiFetch(endpoint, options = {}, query = false, external = false) {
  let qs;
  const { fetchingFrom = 'client' } = options;

  delete options.fetchingFrom;

  if (query) {
    qs = queryString.stringify(query);
  }

  const fetchOptions = apiOptions(options);
  const fetchEndpoint = apiEndpoint(endpoint, qs, fetchingFrom, external);

  const axiosData = {
    method: fetchOptions.method,
    url: fetchEndpoint,
    headers: fetchOptions.headers,
    withCredentials: true
  };

  if (fetchOptions.body) {
    axiosData.data = fetchOptions.body;
  }

  return axios(axiosData)
    .then(response => response && response.data)
    .catch(error => {
      console.log('AXIOS ERROR:', error.response); // eslint-disable-line no-console
    });
}

// Base Actions
import { request, received } from '@baseActions';

// Utils
import { getLanguage, getParamsFromUrl } from '@utils/url';
import { getCurrentLanguage } from '@utils/i18n';
import { mapArrayToParams } from '@utils/frontend';

// Api
import api from '../api';

// Action Types
import { FETCH_POSTS, FETCH_SINGLE_POST, SEARCH_POSTS } from './actionTypes';

// Fetch Posts Action
export const fetchPosts = (fetchingFrom, req) => dispatch => {
  let action = FETCH_POSTS;
  let method = 'fetchPosts';
  let query = {};
  const urlParams = getParamsFromUrl(req.url);

  if (req.url) {
    if (req.url.includes('category')) {
      query = mapArrayToParams(
        ['language', 'app', 'path', 'category'],
        urlParams,
        ['app', 'path']
      );
    } else if (req.url.includes('page')) {
      query = mapArrayToParams(
        ['language', 'app', 'path', 'page'],
        urlParams,
        ['app', 'path']
      );
    } else {
      query = mapArrayToParams(
        ['language', 'app', 'year', 'month', 'day', 'slug'],
        urlParams,
        ['app']
      );
    }
  } else {
    query = req;
  }

  if (!query.hasOwnProperty('language')) {
    query.language = getLanguage(req);
  } else if (query.hasOwnProperty('slug')) {
    action = FETCH_SINGLE_POST;
    method = 'fetchSinglePost';
  }

  dispatch(request(action));

  return api[method](query, fetchingFrom).then(data => dispatch(received(action, data)));
};

// Search Posts Action
export const searchPosts = term => dispatch => {
  const action = SEARCH_POSTS;
  const method = 'searchPosts';
  const query = {
    term
  };

  if (!query.hasOwnProperty('language')) {
    query.language = getCurrentLanguage();
  }

  dispatch(request(action));

  return api[method](query).then(data => dispatch(received(action, data)));
};

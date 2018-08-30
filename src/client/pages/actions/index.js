// Base Actions
import { request, received } from '@baseActions';

// Utils
import { mapArrayToParams } from '@utils/frontend';
import { getParamsFromUrl } from '@utils/url';

// Api
import api from '../api';

// Action Types
import { FETCH_PAGE } from './actionTypes';

// Fetch Posts Action
export const fetchPage = (fetchingFrom, req) => dispatch => {
  const action = FETCH_PAGE;
  const method = 'fetchPage';
  const query = mapArrayToParams(['language', 'app', 'slug'], getParamsFromUrl(req.url));

  delete query.app;

  dispatch(request(action));

  return api[method](query, fetchingFrom).then(data => dispatch(received(action, data)));
};

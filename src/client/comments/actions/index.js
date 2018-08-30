// Base Actions
import { request, received } from '@baseActions';

// Actions Types
import { FETCH_COMMENTS, SAVE_COMMENT, DELETE_COMMENT } from './actionTypes';

// Api
import api from '../api';

export const getComments = query => dispatch => {
  const action = FETCH_COMMENTS;

  dispatch(request(action));

  return api.getComments(query)
    .then(data => dispatch(received(action, data)));
};

export const saveComment = data => dispatch => {
  const action = SAVE_COMMENT;

  dispatch(request(action));

  return api.saveComment(data)
    .then(data => dispatch(received(action, data)));
};

export const deleteComment = query => dispatch => {
  const action = DELETE_COMMENT;

  dispatch(request(action));

  return api.deleteComment(query)
    .then(data => dispatch(received(action, data)));
};

// Base Actions
import { request, received } from '@baseActions';

// Actions Types
import { USER_VALIDATION } from './actionTypes';

// Api
import api from '../api';

export const getUserData = () => dispatch => {
  const action = USER_VALIDATION;

  dispatch(request(action));

  return api.getUserData().then(data => dispatch(received(action, data)));
};

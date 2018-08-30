// Base Actions
import { request, received } from '@baseActions';

// Actions Types
import { FORGOT_PASSWORD_EMAIL, RESET_PASSWORD } from './actionTypes';

// Api
import api from '../api';

export const checkForgotPasswordEmail = query => dispatch => {
  const action = FORGOT_PASSWORD_EMAIL;
  dispatch(request(action));

  return api.checkForgotPasswordEmail(query)
    .then(data => dispatch(received(action, data)));
};

export const resetPassword = data => dispatch => {
  const action = RESET_PASSWORD;
  dispatch(request(action));

  return api.resetPassword(data)
    .then(data => dispatch(received(action, data)));
};

// Base Actions
import { request, received } from '@baseActions';

// Actions Types
import { USER_REGISTRATION } from './actionTypes';

// Api
import api from '../api';

export const doRegister = user => dispatch => {
  const action = USER_REGISTRATION;

  dispatch(request(action));

  return api.doRegister(user).then(data => dispatch(received(action, data)));
};

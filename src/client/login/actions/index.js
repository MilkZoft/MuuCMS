// Base Actions
import { request, received } from '@baseActions';

// Actions Types
import { USER_LOGIN } from './actionTypes';

// Api
import api from '../api';

export const doLogin = user => dispatch => {
  const action = USER_LOGIN;

  dispatch(request(action));

  return api.doLogin(user).then(data => dispatch(received(action, data)));
};

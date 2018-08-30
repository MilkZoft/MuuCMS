// Base Actions
import { request, received } from '@baseActions';

// Actions Types
import { SEND_CONTACT } from './actionTypes';

// Api
import api from '../api';

export const sendContact = data => dispatch => {
  const action = SEND_CONTACT;
  dispatch(request(action));

  return api.sendContactInfo(data)
    .then(data => dispatch(received(action, data)));
};

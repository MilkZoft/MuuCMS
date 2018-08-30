
// Utils
import { getNewState } from '@utils/frontend';
// Actions Types
import { FORGOT_PASSWORD_EMAIL, RESET_PASSWORD } from '../actions/actionTypes';

const initialState = {
  isValid: false,
  inserted: false
};

export default function forgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_EMAIL.success(): {
      const { payload: { response } } = action;
      return getNewState(state, response);
    }
    case RESET_PASSWORD.success(): {
      const { payload: { response } } = action;
      return getNewState(state, response);
    }

    default:
      return state;
  }
}

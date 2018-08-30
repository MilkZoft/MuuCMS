// Utils
import { redirectTo } from '@utils/frontend';

// Actions Types
import { USER_LOGIN } from '../actions/actionTypes';

const initialState = {};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN.success(): {
      const { payload: { response = false } } = action;

      if (response) {
        return redirectTo('/');
      }

      return state;
    }

    default:
      return state;
  }
}

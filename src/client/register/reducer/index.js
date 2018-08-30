// Utils
import { getNewState } from '@utils/frontend';

// Actions Types
import { USER_REGISTRATION } from '../actions/actionTypes';

const initialState = {
  registrationStatus: {
    inserted: false,
    error: ''
  }
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REGISTRATION.success(): {
      const { payload: { response = false } } = action;

      return getNewState(state, {
        registrationStatus: response
      });
    }

    default:
      return state;
  }
}

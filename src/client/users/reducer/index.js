// Utils
import { getNewState, isUser } from '@utils/frontend';

// Actions Types
import { USER_VALIDATION } from '../actions/actionTypes';

const initialState = {
  connectedUser: undefined,
  isGod: undefined,
  isConnected: undefined
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USER_VALIDATION.success(): {
      const { payload: { response = false } } = action;

      return getNewState(state, {
        connectedUser: response,
        isGod: isUser(response, 'god'),
        isConnected: isUser(response)
      });
    }

    default:
      return state;
  }
}

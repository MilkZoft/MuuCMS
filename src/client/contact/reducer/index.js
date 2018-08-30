
// Utils
import { getNewState } from '@utils/frontend';
// Actions Types
import { SEND_CONTACT } from '../actions/actionTypes';

const initialState = {
  inserted: false
};

export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_CONTACT.success(): {
      const { payload: { inserted } } = action;
      return getNewState(state, { inserted });
    }

    default:
      return state;
  }
}

// Utils
import { getNewState } from '@utils/frontend';

// Actions Types
import { OPEN_SEARCH_MODAL } from '../../app/search/actions/actionTypes';

const initialState = {
  isSearchModalOpen: false
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_SEARCH_MODAL: {
      return getNewState(state, {
        isSearchModalOpen: action.isSearchModalOpen
      });
    }

    default:
      return state;
  }
}

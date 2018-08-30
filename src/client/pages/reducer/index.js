// Utils
import { getNewState } from '@utils/frontend';

// Action Types
import { FETCH_PAGE } from '../actions/actionTypes';

const initialState = {
  apiInfo: {},
  page: {}
};

export default function pagesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PAGE.success(): {
      const { payload: { response = [], information = [] } } = action;

      return getNewState(state, {
        apiInfo: information,
        page: response.length > 0 ? response[0] : {}
      });
    }

    default:
      return state;
  }
}

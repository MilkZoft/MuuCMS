
// Utils
import { getNewState } from '@utils/frontend';
// Actions Types
import { FETCH_COMMENTS, SAVE_COMMENT } from '../actions/actionTypes';

const initialState = {
  data: [],
  inserted: false,
  comment: {}
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS.request(): {
      return getNewState(state, { data: [], inserted: false });
    }
    case FETCH_COMMENTS.success(): {
      const { payload: { data } } = action;
      return getNewState(state, { data });
    }

    case SAVE_COMMENT.success(): {
      const { payload: { data } } = action;
      return getNewState(state, data);
    }

    default:
      return state;
  }
}

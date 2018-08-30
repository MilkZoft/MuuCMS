// Utils
import { getNewState } from '@utils/frontend';

// Action Types
import { FETCH_POSTS, FETCH_SINGLE_POST, SEARCH_POSTS } from '../actions/actionTypes';

const initialState = {
  posts: [],
  post: [],
  searchedPosts: [],
  apiInfo: {}
};

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS.success(): {
      const { payload: { response = [], information = [] } } = action;

      return getNewState(state, {
        apiInfo: information,
        posts: response
      });
    }

    case FETCH_SINGLE_POST.success(): {
      const { payload: { response = [] } } = action;

      return getNewState(state, {
        post: response
      });
    }

    case SEARCH_POSTS.success(): {
      const { payload: { response = [], information = [] } } = action;

      return getNewState(state, {
        apiInfo: information,
        searchedPosts: response.length > 0 ? response : false
      });
    }

    default:
      return state;
  }
}

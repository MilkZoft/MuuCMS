// Utils
import { apiFetch } from '@utils/api';

// Constants
import { API } from './constants';

class BlogApi {
  static fetchPosts(query) {
    return apiFetch(API.POSTS, {}, query);
  }

  static fetchSinglePost(query) {
    return apiFetch(API.POST, {}, query);
  }

  static searchPosts(query) {
    return apiFetch(API.SEARCH, {}, query);
  }
}

export default BlogApi;

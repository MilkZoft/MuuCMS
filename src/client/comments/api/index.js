// Utils
import { apiFetch } from '@utils/api';
// Constants
import { API } from './constants';

class CommentApi {
  static getComments(query) {
    return apiFetch(API.COMMENT, {}, query);
  }

  static saveComment(body) {
    return apiFetch(API.COMMENT, { method: 'POST', body });
  }

  static deleteComment(query) {
    return apiFetch(API.DELETE_COMMENT, {}, query);
  }
}

export default CommentApi;

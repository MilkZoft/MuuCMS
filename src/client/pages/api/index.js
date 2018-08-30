// Utils
import { apiFetch } from '@utils/api';

// Constants
import { API } from './constants';

class PagesApi {
  static fetchPage(query) {
    return apiFetch(API.PAGE, {}, query);
  }
}

export default PagesApi;

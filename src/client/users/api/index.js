// Utils
import { apiFetch } from '@utils/api';

// Constants
import { API } from './constants';

class UsersApi {
  static getUserData() {
    return apiFetch(API.VALIDATION);
  }
}

export default UsersApi;

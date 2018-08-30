// Utils
import { apiFetch } from '@utils/api';

// Constants
import { API } from './constants';

class LoginApi {
  static doLogin(user) {
    const { username, password } = user;
    const body = JSON.stringify({
      username,
      password
    });

    return apiFetch(API.LOGIN, {
      method: 'POST',
      body
    });
  }
}

export default LoginApi;

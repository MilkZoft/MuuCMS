// Utils
import { apiFetch } from '@utils/api';

// Constants
import { API } from './constants';

class RegisterApi {
  static doRegister(user) {
    const body = JSON.stringify(user);

    return apiFetch(API.REGISTRATION, {
      method: 'POST',
      body
    });
  }
}

export default RegisterApi;

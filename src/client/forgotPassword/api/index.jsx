// Utils
import { apiFetch } from '@utils/api';
// Constants
import { API } from './constants';

class ForgotPasswordApi {
  static checkForgotPasswordEmail(query) {
    return apiFetch(API.FORGOT_PASSWORD, {}, query);
  }

  static resetPassword(body) {
    return apiFetch(API.FORGOT_PASSWORD, { method: 'POST', body });
  }
}

export default ForgotPasswordApi;

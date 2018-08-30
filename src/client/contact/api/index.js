// Utils
import { apiFetch } from '@utils/api';
// Constants
import { API } from './constants';

class ContactApi {
  static sendContactInfo(data) {
    const body = JSON.stringify(data);
    return apiFetch(API.CONTACT, { method: 'POST', body });
  }
}

export default ContactApi;

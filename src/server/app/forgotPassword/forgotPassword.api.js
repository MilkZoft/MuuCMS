import { sanitize } from '@utils/string';

export default (req, res, next) => {
  async function checkEmail() {
    try {
      // Method get is required
      if (!req.method === 'GET') {
        return {
          error: 'This function needs to be called by GET method'
        };
      }

      // Slug information is required
      if (!req.query || !req.query.email) {
        return {
          error: 'All parameters are required'
        };
      }

      const email = sanitize(req.query.email);
      const userInfo = await res.usersModel.cms().getUserInfoAsync({ email });

      if (!userInfo) {
        return { error: 'User does not exist' };
      }

      return {
        response: {
          isValid: true
        }
      };
    } catch (error) {
      console.log('Error in forgotPassword API:', error); // eslint-disable-line no-console
    }
  }

  async function resetPassword() {
    try {
      // method get is required
      if (!req.method === 'POST') {
        return { error: 'Expected a post request' };
      } else if (!req.body || !req.body.email || !req.body.newPassword) {
        return { error: 'All parameters are required' };
      }

      // clean up input data
      const email = sanitize(req.body.email);
      const newPassword = sanitize(req.body.newPassword);

      // we need to be sure that that the request has been sent for a valid user
      const userInfo = await res.usersModel.cms().getUserInfoAsync({ email });

      if (!userInfo) {
        return {
          error: 'User is not valid'
        };
      }
      // reset the password in db
      const userId = userInfo[0].id;
      const userData = {
        password: newPassword
      };
      const infoUpdated = await res.forgotPassModel.cms().resetPassword(userData, userId);

      if (infoUpdated) {
        return {
          response: {
            inserted: true
          }
        };
      }

      return {
        error: 'Error trying to update password'
      };
    } catch (error) {
      console.log('Error Reseting Password:', error); // eslint-disable-line no-console
    }
  }
  // Methods
  res.forgotPasswordAPI = {
    checkEmail,
    resetPassword
  };

  return next();
};

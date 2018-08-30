// Utils
import { isDefined } from '../utils/is';

export function User(req, res) {
  /**
   * Returns user information if is a profileAllowed
   *
   * @param {function} callback Callback
   * @param {bool} isApi True if is API Endpoint
   * @param {object} user User when the user try to login through website
   * @returns {callback} Callback or redirects if the user is not allowed
   * @name profileAllowed
   * @function
   */
  function profileAllowed(callback, isApi, user, allowedPrivileges = ['god', 'admin', 'user']) {
    let connectedUser = res.session('user');

    if (user) {
      connectedUser = {
        network: 'website',
        username: user.username,
        password: user.password
      };
    }

    if (isDefined(connectedUser) && (isDefined(res.session('oauth')) || user)) {
      const {
        network = false,
        networkId = false,
        username = false,
        password = false
      } = connectedUser;

      res.usersModel.cms().getPrivilege({
        network,
        networkId,
        username,
        password
      }, userInfo => {
        const privilege = userInfo ? userInfo.privilege : false;
        const userData = {
          ...connectedUser,
          privilege
        };

        if (network === 'website' && !privilege) {
          return callback(false);
        }

        if (allowedPrivileges.includes(privilege)) {
          if (!res.session('user')) {
            res.session('user', userData);
          }

          return callback(userData);
        } else {
          return !isApi ? res.redirect('/') : callback(false);
        }
      });
    }
  }

  // Methods
  return {
    profileAllowed
  };
}

export default (req, res, next) => {
  const { profileAllowed } = User(req, res);

  // Methods
  res.profileAllowed = profileAllowed;

  return next();
};

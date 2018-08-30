// Utils
import { isArray, isJson, isString, isUndefined } from '@utils/is';
import { forEach } from '@utils/object';

// Configuration
import { $session } from '@configuration';

export function Session(req, res) {
  // Global vars
  const { cookiePrefix } = $session();
  const sessionData = parseSession(); // eslint-disable-line

  const options = {
    domain: $session().cookieDomain,
    path: $session().path,
    maxAge: new Date(Date.now() + $session().maxAge),
    httpOnly: $session().httpOnly
  };

  const deleteOptions = {
    domain: $session().cookieDomain,
    path: $session().path,
    httpOnly: $session().httpOnly
  };

  /**
   * Clears session data
   *
   * @param {array} keys Keys
   * @returns {mixed} Session data if is a get
   * @name clearSession
   * @function
   */
  function clearSession(keys) {
    let cookieKey;
    const key = keys;

    if (isArray(keys)) {
      keys.forEach(key => {
        delete sessionData[key];

        cookieKey = `${cookiePrefix}${key}`;
        res.clearCookie(cookieKey, deleteOptions);
      });
    } else {
      delete sessionData[key];

      cookieKey = `${cookiePrefix}${key}`;
      res.clearCookie(cookieKey, deleteOptions);
    }
  }

  /**
   * Destroys all sessions
   *
   * @returns {object} null
   * @name destroySessions
   * @function
   */
  function destroySessions() {
    let cookieKey;

    if (sessionData) {
      forEach(sessionData, key => {
        delete sessionData[key];

        cookieKey = `${cookiePrefix}${key}`;
        res.clearCookie(cookieKey, deleteOptions);
      });
    }

    return null;
  }

  /**
   * Parses the session and returns a JSon Object
   *
   * @returns {array} Sessions data
   * @name parseSession
   * @function
   */
  function parseSession() {
    const rVal = {};

    if (req && req.cookies) {
      forEach(req.cookies, key => {
        const sessionPrefix = new RegExp(`^${cookiePrefix}`);
        const isSessionCookie = key.search(sessionPrefix) !== -1;
        let value = req.cookies[key];

        if (isSessionCookie) {
          key = key.replace(sessionPrefix, '');

          if (isJson(value)) {
            value = JSON.parse(value);
          }

          rVal[key] = value;
        }
      });
    }

    return rVal;
  }

  /**
   * Get/set session data
   *
   * @param {string} key Key
   * @param {mixed} value Value
   * @returns {mixed} Session data if is a get
   * @name session
   * @function
   */
  function session(key, value) {
    // required params missing
    if (!key && isUndefined(value)) {
      return sessionData;
    }

    // retrieve value
    if (!value) {
      return sessionData[key] || false;
    }

    // set value
    sessionData[key] = value;

    // set cookie
    const cookieKey = cookiePrefix + key;
    const cookieValue = isString(value) ? value : JSON.stringify(value);

    return res.cookie(cookieKey, cookieValue, options);
  }

  // Methods
  return {
    clearSession,
    destroySessions,
    parseSession,
    session
  };
}

export default (req, res, next) => {
  const {
    clearSession,
    destroySessions,
    session
  } = Session(req, res);

  // Methods
  res.session = session;
  res.clearSession = clearSession;
  res.destroySessions = destroySessions;

  return next();
};

// Configuration
import { $security } from '@configuration';

// Utils
import { isArray, isDefined, isObject } from '@utils/is';
import { exists, forEach } from '@utils/object';
import { escapeString, removeHTML } from '@utils/string';
import { getValueFromParam } from '@utils/url';

let postData = {};

export function Post(req, res) {
  /**
   * Refresh Security Token
   *
   * @returns {void}
   * @name refreshSecurityToken
   * @function
   */
  function refreshSecurityToken() {
    if ($security().refreshSecurityToken) {
      res.clearSession('securityToken');
    }
  }

  /**
   * Validates the Security Token
   *
   * @param {string} securityToken securityToken
   * @returns {void}
   */
  function hasValidSecurityToken(securityToken) {
    return res.session('securityToken') === securityToken;
  }

  /**
   * Validate Security Token
   *
   * @param {boolean} disable Disable
   * @returns {void}
   * @name validateSecurityToken
   * @function
   */
  function validateSecurityToken(disable) {
    if ($security().validateSecurityToken && !disable) {
      postData = {};

      if (hasValidSecurityToken(req.body.securityToken)) {
        postData = req.body;
      }
    } else {
      postData = req.body;
    }
  }

  /**
   * Return the current action
   *
   * @returns {string} Action
   * @name action
   * @function
   */
  function action() {
    const actions = ['create', 'update', 'delete', 'remove', 'restore', 'upload', 'all'];
    let action = 'readAction';

    if (exists(req.params.action, actions)) {
      if (isDefined(req.params[0])) {
        res.currentId = getValueFromParam(req.params[0]);
      }

      action = `${req.params.action}Action`;
    }

    // Sending the action to the templates
    res.locals.action = action;

    return action;
  }

  /**
   * Print a variable with res.send
   *
   * @param {*} variable Variable
   * @returns {string} res.send
   * @name debug
   * @function
   */
  function debug(variable) {
    return res.send(variable);
  }

  /**
   * Get all post values
   *
   * @param {object} options Options
   * @param {boolean} disableSecurityToken disableSecurityToken
   * @returns {object} values
   * @name getAllPost
   * @function
   */
  function getAllPost(options, disableSecurityToken) {
    validateSecurityToken(disableSecurityToken);

    if (!isDefined(options)) {
      options = {
        exclude: [
          'register',
          'publish',
          'securityToken'
        ]
      };
    }

    if (isObject(postData)) {
      const values = {};

      forEach(postData, key => {
        if (options.exclude.length > 0) {
          const exists = options.exclude.filter(option => option === key);

          if (exists.length === 0) {
            values[key] = postData[key].trim();
          }
        } else {
          values[key] = postData[key].trim();
        }
      });

      return values;
    }

    return false;
  }

  /**
   * Get Posts from Array
   *
   * @param {array} inputs Inputs
   * @returns {object} Posts
   * @name _getPostsFromArray
   * @function
   */
  function _getPostsFromArray(inputs) {
    const posts = {};
    let filter;
    let value;

    forEach(inputs, input => {
      value = postData[input];
      filter = input.split(':');

      if (filter[1]) {
        input = input.replace(`:${filter[1]}`, '');
        value = postData[input];
      }

      posts[input] = value;
    });

    return posts;
  }

  /**
   * Return true if the method is GET
   *
   * @returns {boolean} True if is GET method
   * @name isGet
   * @function
   */
  function isGet() {
    return req.method === 'GET';
  }

  /**
   * Return true if the method is POST
   *
   * @returns {boolean} True if is POST method
   * @name isPost
   * @function
   */
  function isPost() {
    return req.method === 'POST';
  }

  /**
   * Get post value
   *
   * @param {*} input Input
   * @param {string} filter Filter
   * @param {boolean} disableSecurityToken disableSecurityToken
   * @returns {string} value
   * @name post
   * @function
   */
  function post(input, filter, disableSecurityToken) {
    const inputs = input;
    let value;

    if (!filter) {
      filter = 'clean';
    }

    validateSecurityToken(disableSecurityToken);

    if (isArray(inputs)) {
      return _getPostsFromArray(inputs);
    }

    if (isDefined(postData[input])) {
      value = postData[input];

      const disableFilter = isArray(value) || isObject(value);

      if (!disableFilter && filter === 'escape') {
        value = escapeString(value);
      } else if (!disableFilter && filter === 'clean') {
        value = escapeString(removeHTML(value));
      }

      if (value === 'yes') {
        return 1;
      }

      return value === 'no' ? 0 : value;
    }

    return false;
  }

  // Methods
  return {
    action,
    debug,
    getAllPost,
    hasValidSecurityToken,
    isGet,
    isPost,
    post,
    refreshSecurityToken,
    validateSecurityToken,
    _getPostsFromArray
  };
}

export default (req, res, next) => {
  const {
    action,
    debug,
    getAllPost,
    hasValidSecurityToken,
    isGet,
    isPost,
    post,
    refreshSecurityToken,
    validateSecurityToken
  } = Post(req, res);

  // Methods
  res.action = action;
  res.debug = debug;
  res.getAllPost = getAllPost;
  res.hasValidSecurityToken = hasValidSecurityToken;
  res.isGet = isGet;
  res.isPost = isPost;
  res.post = post;
  res.refreshSecurityToken = refreshSecurityToken;
  res.validateSecurityToken = validateSecurityToken;

  return next();
};

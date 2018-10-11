// Utils
import { forEach, keys } from '@utils/object';

// Helpers
import * as Model from '@helpers/model';

export default (req, res, next) => {
  // * Global vars
  const table = 'users';
  const modelName = `${table}Model`;
  const fields = [
    'id',
    'network',
    'networkId',
    'username',
    'password',
    'email',
    'avatar',
    'subscribed'
  ];

  // * Validate if exists
  const validateIfExists = data => ({
    condition: 'OR',
    username: data.username,
    email: data.email
  });

  function cms() {
    /**
     * Returns the user privilege (god, admin or user)
     *
     * @param {string} user Username
     * @param {function} callback Callback
     * @returns {callback} Callback
     */
    function getPrivilege(user, cb) {
      const { network, networkId, username, state = 'Active', password = '' } = user;

      const queryData = {
        table,
        fields: 'privilege',
        query: {
          network,
          networkId: network !== 'website' ? networkId : 0,
          username,
          state
        },
        debug: {
          filename: 'users.model.js',
          method: 'getPrivilege'
        }
      };

      if (password) {
        queryData.query.password = password;
      }

      Model.findByQuery(queryData, result => cb(result ? result[0] : false));
    }

    /**
     * Returns the user information
     *
     * @param {string} user Username
     * @param {function} callback Callback
     * @returns {callback} Callback
     */
    function getUser(user, cb) {
      const { network, networkId, username, state = 'Active' } = user;

      const query = {
        table,
        fields,
        query: {
          network,
          networkId,
          username,
          state
        },
        debug: {
          filename: 'users.model.js',
          method: 'getUser'
        }
      };

      Model.findByQuery(query, result => cb(result ? result[0] : false));
    }

    function getUserAsync(userData) {
      return new Promise((resolve) => {
        const { network, username, state = 'Active', networkId } = userData;

        const query = {
          table,
          fields,
          query: {
            network,
            username,
            state
          },
          debug: {
            filename: 'users.model.js',
            method: 'getUser'
          }
        };
        // if the user has logged with email and pass the network id will be undefined
        if (networkId) {
          query.networkId = networkId;
        }

        Model.findByQuery(query, result => {
          if (result) resolve(result[0]);
          else resolve(false);
        });
      });
    }

    /**
    * Returns the user information
    *
    * @param {Object} query fields
    * @returns {array} array with records
    */
    function getUserInfoAsync(queryFields) {
      return new Promise((resolve) => {
        const query = {
          table,
          fields,
          query: queryFields,
          debug: {
            filename: 'users.model.js',
            method: 'getUser'
          }
        };

        Model.findByQuery(query, result => {
          if (result) resolve(result);
          else resolve(false);
        });
      });
    }


    /**
     * Saves a user in the database
     *
     * @param {object} data User data
     * @param {function} callback Callback
     * @returns {callback} Callback
     */
    function save(data, cb) {
      const fields = keys(data);
      let save = true;
      const errorMessages = {};

      // * Required fields
      res.content('Dashboard.forms.fields.error', true);

      const requiredFields = {
        username: res.content('username'),
        email: res.content('email')
      };

      forEach(fields, field => {
        if (requiredFields[field] && data[field] === '') {
          save = false;
          errorMessages[field] = requiredFields[field];
        }
      });

      if (save) {
        Model.existsRow(table, validateIfExists(data), exists => {
          if (!exists) {
            return Model.insertRow(table, data, () => cb(true, false));
          }

          return cb(false, 'Dashboard.forms.fields.error.exists');
        });
      } else {
        return cb(false, errorMessages);
      }
    }

    return {
      getPrivilege,
      getUser,
      getUserAsync,
      save,
      getUserInfoAsync
    };
  }

  // Methods
  res[modelName] = {
    cms
  };

  return next();
};

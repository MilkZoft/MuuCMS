
// Utils
import { forEach, keys } from '@utils/object';

// Helpers
import * as Model from '@helpers/model';
import { currentDateAndTime } from '@utils/date';

export default (req, res, next) => {
  // * Global vars
  const table = 'contact';
  const modelName = `${table}Model`;

  function cms() {
    /**
     * Save a contact in the database
     *
     * @param {object} content info
     * @param {function} callback Callback
     * @returns {callback} Callback
     */
    function save(data, cb) {
      const fields = keys(data);
      let fieldsValid = true;
      const errorMessages = {};

      const requiredFields = {
        name: data.name,
        email: data.email,
        message: data.message
      };

      forEach(fields, field => {
        if (requiredFields[field] && data[field] === '') {
          fieldsValid = false;
          errorMessages[field] = requiredFields[field];
        }
      });

      data.createdAt = currentDateAndTime();

      if (!fieldsValid) {
        return cb(false, errorMessages);
      }

      return Model.insertRow(table, data, () => cb(true, false));
    }

    return {
      save
    };
  }

  // Methods
  res[modelName] = {
    cms
  };

  return next();
};

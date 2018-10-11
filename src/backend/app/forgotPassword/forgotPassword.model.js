// Helpers
import * as Model from '@helpers/model';

export default (req, res, next) => {
  // * Global vars
  const modelName = 'forgotPassModel';

  function cms() {
    /**
     * Look for a record in the db
     *
     * @param {object}, data with configuration values to perform the query
     * @returns {Array} array of records
     */
    async function searchInDb(data) {
      const queryResult = await Model.searchAsync(data);
      return queryResult;
    }

    async function resetPassword(data, id) {
      const queryResult = await Model.updateRowAsync('users', data, id);
      return queryResult && queryResult.affectedRows > 0;
    }

    return {
      searchInDb,
      resetPassword
    };
  }

  // Methods
  res[modelName] = {
    cms
  };

  return next();
};

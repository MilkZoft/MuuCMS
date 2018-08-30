// Helpers
import * as Model from '@helpers/model';

/**
 * Returns content from database
 *
 * @param {string} language Language
 * @param {function} cb cb
 * @returns {function} cb
 */
export function getContent(data, cb) {
  const query = {
    table: 'content',
    fields: 'id, name, value, language, state',
    query: {
      state: 'Active'
    }
  };

  if (data && data.language) {
    query.query.language = data.language;

    return Model.findByQuery(query, result => cb(result));
  }

  return Model.findAll(query, result => cb(result));
}

// Helpers
import * as Model from '@helpers/model';

// Utils
import { getCurrentApp } from '@utils/url';

export default (req, res, next) => {
  const currentApp = getCurrentApp(req.originalUrl, true);

  const table = currentApp;
  const filename = 'pages.model.js';

  function cms() {
    function count(data, cb) {
      Model.countAllRowsFrom({ table, ...data }, total => cb(total));
    }

    function page(requestQuery, cb) {
      const { query } = requestQuery;
      const data = {
        table,
        query,
        debug: {
          filename,
          method: 'page'
        }
      };

      const {
        slug,
        language = 'en'
      } = query;

      const cacheKey = `page(${slug}, ${language})`;

      // Returning cache if exists...
      res.cache.exists(cacheKey, exists => {
        if (exists) {
          res.cache.get(cacheKey, reply => cb(true, reply));
        } else {
          Model.findByQuery(data, result => {
            res.cache.set(cacheKey, result);

            return cb(false, result);
          });
        }
      });
    }

    return {
      count,
      page,
    };
  }

  // Methods
  res.pagesModel = {
    cms
  };

  return next();
};

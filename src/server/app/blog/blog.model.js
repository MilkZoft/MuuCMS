// Helpers
import * as Model from '@helpers/model';
import { getPaginationLimit } from '@helpers/pagination';

export default (req, res, next) => {
  const table = 'blog';
  const order = 'id desc';
  const filename = 'blog.model.js';

  function cms() {
    function count(data, cb) {
      Model.countAllRowsFrom({ table, ...data }, total => cb(total));
    }

    function post(requestQuery, cb) {
      const { query } = requestQuery;
      const data = {
        table,
        query,
        debug: {
          filename,
          method: 'post'
        }
      };

      const {
        slug,
        day,
        month,
        year,
        language = 'en'
      } = query;

      const cacheKey = `post(${slug}, ${day}, ${month}, ${year}, ${language})`;

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

    function posts(requestQuery, cb) {
      const {
        page,
        total = 0,
        language,
        category = false,
        state,
        rss = false
      } = requestQuery;

      const limit = getPaginationLimit(page, total);

      const data = {
        table,
        fields: '*',
        order,
        limit,
        query: {
          language,
          state
        },
        debug: {
          filename,
          method: 'posts'
        }
      };

      if (category) {
        data.query.category = category;
      }

      const cacheKey = !rss ? `posts(${language}, ${category}, ${limit})` : `rss(${language})`;

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

    function search(requestQuery, cb) {
      const {
        language,
        state,
        term
      } = requestQuery;

      const data = {
        table: 'blog',
        fields: '*',
        searchBy: ['title', 'content'],
        searchTerm: term,
        language,
        state,
        debug: {
          filename,
          method: 'search'
        }
      };

      const cacheKey = `search(${language}, ${term})`;

      // Returning cache if exists...
      res.cache.exists(cacheKey, exists => {
        if (exists) {
          res.cache.get(cacheKey, reply => cb(true, reply));
        } else {
          Model.search(data, result => {
            res.cache.set(cacheKey, result);

            return cb(false, result);
          });
        }
      });
    }

    return {
      count,
      posts,
      post,
      search
    };
  }

  // Methods
  res.blogModel = {
    cms
  };

  return next();
};

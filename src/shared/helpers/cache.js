// Dependencies
import redis from 'redis';

// Configuration
import { $cache } from '@configuration';

// Utils
import { md5 } from '@utils/security';

export function Cache(isUnitTest) {
  let cacheClient;

  if (!isUnitTest && $cache().enable) {
    // Creating Redis Client
    cacheClient = redis.createClient($cache().port, $cache().host);
  }

  /**
   * Converts the cache key to md5
   *
   * @param {string} key Cache Key
   * @returns {string} MD5 Hash
   * @name _getCacheKey
   * @function
   */
  function _getCacheKey(key) {
    return md5(key);
  }

  /**
   * Validates if a specific cache exists
   *
   * @param {string} key Cache Key
   * @param {function} callback Callback
   * @returns {function} Callback
   * @name exists
   * @function
   */
  function exists(key, callback) {
    if (!$cache().enable) {
      return callback(false);
    }

    return cacheClient.exists(_getCacheKey(key), (error, exists) => {
      if (error) {
        console.log('Redis Error:', error); // eslint-disable-line no-console

        return callback(false);
      }

      return callback(exists);
    });
  }

  /**
   * Gets the cache by key
   *
   * @param {string} key Cache Key
   * @param {function} callback Callback
   * @returns {function} Callback
   * @name get
   * @function
   */
  function get(key, callback) {
    if ($cache().enable) {
      cacheClient.get(_getCacheKey(key), (error, reply) => {
        if (error) {
          console.log('Redis Error:', error); // eslint-disable-line no-console
        }

        return callback(JSON.parse(reply));
      });
    } else {
      return callback(false);
    }
  }

  /**
   * Removes the cache by key
   *
   * @param {string} key Cache Key
   * @returns {boolean} True if the cache has been removed
   * @name remove
   * @function
   */
  function remove(key) {
    if ($cache().enable) {
      cacheClient.del(_getCacheKey(key));

      return true;
    } else {
      return false;
    }
  }

  /**
   * Adds expiration time to the cache
   *
   * @param {string} key Cache Key
   * @param {number} expirationTime Expiration Time
   * @returns {boolean} True if the expiration time has been added
   * @name _expire
   * @function
   */
  function _expire(key, expirationTime) {
    if ($cache().enable) {
      cacheClient.expire(_getCacheKey(key), expirationTime || $cache().expirationTime);

      return true;
    } else {
      return false;
    }
  }

  /**
   * Sets a cache using key, value and expirationTime
   *
   * @param {string} key Cache Key
   * @param {*} value Value
   * @param {number} expirationTime Expiration Time
   * @returns {boolean} True if the cache has been setted
   * @name set
   * @function
   */
  function set(key, value, expirationTime) {
    if ($cache().enable) {
      cacheClient.set(_getCacheKey(key), JSON.stringify(value));

      _expire(key, expirationTime);

      return true;
    } else {
      return false;
    }
  }

  // Methods
  return {
    exists,
    get,
    remove,
    set
  };
}

export default (req, res, next) => {
  const { exists, get, remove, set } = Cache();

  // Methods
  res.cache = {
    exists,
    get,
    remove,
    set
  };

  return next();
};

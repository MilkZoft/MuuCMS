export default (req, res, next) => {
  function login(callback) {
    if (req.method === 'POST') {
      const { body = false } = req;

      res.profileAllowed(results => callback(results), true, body);
    } else {
      res.json({
        error: 'This function needs to be called by POST method'
      });
    }
  }

  function registration(callback) {
    if (req.method === 'POST') {
      const { body = false } = req;
      // extract twitter info from session
      const profileData = res.session('userTemp');

      if (profileData.profile) {
        // apend the avatar url to the body object
        body.avatar = profileData.profile.avatar;
      } else if (!profileData) {
        const userData = {
          ...body,
          network: 'website',
          privilege: 'user'
        };

        res.session('userTemp', userData);
      }

      res.usersModel.cms().save(body, (inserted, error) => {
        if (inserted) {
          return callback({
            inserted
          });
        }

        return callback({
          error
        });
      });
    } else {
      res.json({
        error: 'This function needs to be called by POST method'
      });
    }
  }

  function validation(callback) {
    res.profileAllowed(results => callback(results), true);
  }

  // Methods
  res.usersAPI = {
    login,
    registration,
    validation
  };

  return next();
};

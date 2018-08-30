export default (req, res, next) => {
  function saveContact(callback) {
    if (req.method === 'POST') {
      res.contactModel
        .cms()
        .save(req.body, (inserted, error) => callback(inserted ? { inserted } : { error }));
    } else {
      callback({
        error: 'This function needs to be called by POST method'
      });
    }
  }

  // Methods
  res.contactAPI = {
    saveContact
  };

  return next();
};

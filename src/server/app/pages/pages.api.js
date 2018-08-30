export default (req, res, next) => {
  function page(query, callback) {
    query.state = 'Active';

    res.pagesModel.cms().page({
      query
    }, (cache, result) => callback(cache, result));
  }

  // Methods
  res.pagesAPI = {
    page
  };

  return next();
};

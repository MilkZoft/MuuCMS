export default (req, res, next) => {
  function get(apiParams, callback) {
    const {
      application,
      action,
      query,
      appParams = {},
      all,
      order,
      orderBy,
      searchBy,
      searchTerm,
      fields
    } = apiParams;

    if (action === 'get') {
      res.dashboardModel.cms(application).count(query, total => {
        res.dashboardModel
          .cms(application)
          .get({
            params: {
              all,
              order,
              orderBy,
              total,
              page: appParams.page || 0,
              fields
            },
            query
          }, result => callback(result, total));
      });
    } else if (action === 'search') {
      res.dashboardModel.cms(application).count(query, total => {
        res.dashboardModel
          .cms(application)
          .search({
            searchBy,
            searchTerm,
            params: {
              all,
              order,
              orderBy,
              total,
              page: appParams.page || 0,
              fields
            }
          }, results => callback(results, 1));
      });
    }
  }

  function post(apiParams, callback) {
    const { application, body } = apiParams;

    res.dashboardModel
      .dashboard(application)
      .saveRow(body, (result, error = false) => callback(result, error));
  }

  function remove(apiParams, callback) {
    const { application, id } = apiParams;

    res.dashboardModel
      .dashboard(application)
      .removeRow(id, result => callback(result));
  }

  function put(apiParams, callback) {
    const { application, body } = apiParams;

    res.dashboardModel
      .dashboard(application)
      .updateRow(body, result => callback(result));
  }

  // Methods
  res.dashboardAPI = {
    get,
    post,
    remove,
    put
  };

  return next();
};

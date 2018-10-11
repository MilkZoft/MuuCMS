// Dependencies
import express from 'express';

// Configuration
import { $app } from '@configuration';

// Utils
import { isFunction } from '@utils/is';
import { camelCase, sanitize } from '@utils/string';

// Express Router
const Router = express.Router();

// Allowed Apps
const allowedApps = $app().allowed;

// PUT Method
Router.put('/:application/:id', (req, res) => {
  const { application, id } = req.params;
  const allowedApp = allowedApps[application];

  if (allowedApp && !allowedApp.private && allowedApp.actions.update) {
    const data = sanitize(req.body);

    const apiParams = {
      application,
      body: { id, ...data }
    };

    res.dashboardAPI.put(apiParams, (response, error) => {
      if (response) {
        res.json({
          information: {
            affectedRows: 1,
            apiParams
          },
          response: {
            updated: true
          }
        });
      } else {
        res.json({
          error: true,
          errorMessage: error
        });
      }
    });
  } else {
    res.json({
      error: true,
      message: 'Unauthorized'
    });
  }
});

// DELETE Method
Router.delete('/:application/:id', (req, res) => {
  const { application, id } = req.params;
  const allowedApp = allowedApps[application];

  if (allowedApp && !allowedApp.private && allowedApp.actions.delete) {
    const apiParams = {
      application,
      id
    };

    res.dashboardAPI.remove(apiParams, (response, error) => {
      if (response) {
        res.json({
          information: {
            affectedRows: 1,
            apiParams
          },
          response: {
            deleted: true
          }
        });
      } else {
        res.json({
          error: true,
          errorMessage: error
        });
      }
    });
  } else {
    res.json({
      error: true,
      message: 'Unauthorized'
    });
  }
});

Router.delete('/:application/', (req, res) => {
  res.send({
    error: 'You must send the id, DELETE /:application/:id'
  });
});

// POST Method
Router.post('/:application', (req, res) => {
  const { application } = req.params;
  const allowedApp = allowedApps[application];

  if (allowedApp && !allowedApp.private && allowedApp.actions.create) {
    const data = sanitize(req.body);

    const apiParams = {
      application,
      body: data
    };

    res.dashboardAPI.post(apiParams, (response, error) => {
      if (response) {
        res.json({
          information: {
            affectedRows: 1,
            apiParams
          },
          response: {
            inserted: true
          }
        });
      } else {
        res.json({
          error: true,
          errorMessage: error
        });
      }
    });
  } else {
    res.json({
      error: true,
      message: 'Unauthorized'
    });
  }
});

// GET Method
Router.get('/:application', (req, res) => {
  const { application } = req.params;
  const allowedApp = allowedApps[application];
  const {
    action = 'get',
    appParams,
    query,
    all = false,
    order,
    orderBy,
    searchBy,
    searchTerm,
    fields
  } = sanitize(req.query);

  const apiParams = {
    application,
    action,
    appParams,
    query,
    all,
    order,
    orderBy,
    searchBy,
    searchTerm,
    fields
  };

  if (allowedApp && !allowedApp.private && allowedApp.actions.read) {
    res.dashboardAPI.get(apiParams, (response, rows) => {
      if (response) {
        res.json({
          information: {
            total: response.length,
            rows,
            apiParams
          },
          response
        });
      } else {
        res.json({
          error: true
        });
      }
    });
  } else {
    res.json({
      error: true,
      message: 'Unauthorized'
    });
  }
});

Router.get('/users/:endpoint*?', (req, res) => {
  const endpointMethod = camelCase(req.params.endpoint);

  if (isFunction(res.usersAPI[endpointMethod])) {
    return res.usersAPI[endpointMethod](response => {
      if (response) {
        res.json({
          response
        });
      } else {
        res.json({
          error: true
        });
      }
    });
  } else {
    res.json({
      error: true
    });
  }
});

// POST Method
Router.post('/users/:endpoint*?', (req, res) => {
  const endpointMethod = camelCase(req.params.endpoint);

  if (isFunction(res.usersAPI[endpointMethod])) {
    return res.usersAPI[endpointMethod](response => {
      if (response) {
        res.json({
          response
        });
      } else {
        res.json({
          error: res.content('Api.errors.noData')
        });
      }
    });
  } else {
    return res.json({
      error: res.content('Api.errors.noData')
    });
  }
});

export default Router;

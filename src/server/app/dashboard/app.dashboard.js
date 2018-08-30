// Utils
import { forEach } from '@utils/object';
import { getCurrentApp } from '@utils/url';
import fs from 'fs';

// Helpers
import { getPagination } from '@helpers/pagination';

// Utils
import { getFileInfo } from '../../../shared/utils/files';
import { randomCode } from '../../../shared/utils/security';

export default (req, res, next) => {
  // CRUD Views
  const createView = 'dashboard/actions/create';
  const readView = 'dashboard/actions/read';
  const updateView = 'dashboard/actions/update';

  // Urls
  const currentApp = getCurrentApp(req.originalUrl, true);
  const dashboardAppUrl = `${req.basePath}/dashboard/${currentApp}`;
  const paginationUrl = `${dashboardAppUrl}/page/`;

  // * Application model
  const appModel = 'dashboardModel';

  /**
   * Create
   *
   * @returns {void} void
   */
  function createAction() {
    res.content(`Dashboard.modules.${currentApp}`, true);

    // Setting some vars
    res.renderScope.set('section', res.content('name'));

    if (res.isPost()) {
      // Retreiving all post data
      const post = res.getAllPost();

      // Trying to save the post
      res[appModel].dashboard().saveRow(post, (result, errors) => {
        // Do we have some errors?
        if (errors === 'exists') {
          res[appModel].dashboard().getSchema(schema => {
            // The post was added correclty
            schema.alert = {
              type: 'warning',
              icon: 'times',
              message: res.content('messages.add.exists')
            };

            res.renderScope.set('schema', schema);
            res.render(createView, res.renderScope.get());
          });
        } else if (errors) {
          // Getting the schema to re-render the form.
          res[appModel].dashboard().getSchema(schema => {
            schema.alert = {
              type: 'danger',
              icon: 'times',
              message: res.content('messages.add.fail')
            };

            // Assigning the error messages to the schema
            forEach(errors, error => {
              if (schema[error]) {
                schema[error].errorMessage = errors[error];
              }
            });

            res.renderScope.set('schema', schema);
            res.renderScope.set('flashData', post);
            res.render(createView, res.renderScope.get());
          });
        } else if (result) {
          // Getting the schema to re-render the form.
          res[appModel].dashboard().getSchema(schema => {
            // The post was added correclty
            schema.alert = {
              type: 'info',
              icon: 'check',
              message: res.content('messages.add.success')
            };

            res.renderScope.set('schema', schema);
            res.render(createView, res.renderScope.get());
          });
        }
      });
    } else {
      res[appModel].dashboard().getSchema(schema => {
        res.renderScope.set('schema', schema);
        res.render(createView, res.renderScope.get());
      });
    }
  }

  /**
   * Read
   *
   * @returns {void} void
   */
  function readAction() {
    res.content('Dashboard.table', true);

    if (res.isPost()) {
      const searchTerm = res.post('search', false, true);
      const deleteAction = res.post('deleteAction', false, true);
      const removeAction = res.post('removeAction', false, true);
      const restoreAction = res.post('restoreAction', false, true);
      const rows = res.post('rows', false, true);
      const action = deleteAction
        ? 'deleteAction'
        : removeAction
          ? 'removeAction'
          : 'restoreAction';

      if (rows && deleteAction || removeAction || restoreAction) {
        res[appModel].dashboard()[action](rows, () => {
          res.redirect(dashboardAppUrl);
        });
      } else {
        res[appModel].dashboard().search(searchTerm, tableSchema => {
          res.renderScope.set('tableSchema', tableSchema);
          res.renderScope.set('searching', searchTerm);

          res.render(readView, res.renderScope.get());
        });
      }
    } else {
      res[appModel].dashboard().count(total => {
        res[appModel].dashboard().getRows(total, tableSchema => {
          res.renderScope.set('tableSchema', tableSchema);
          res.renderScope.set('pagination', getPagination(req.params, total, paginationUrl));

          res.render(readView, res.renderScope.get());
        });
      });
    }
  }

  /**
   * Update
   *
   * @returns {void} void
   */
  function updateAction() {
    res.content(`Dashboard.modules.${currentApp}`, true);

    // Setting some vars
    res.renderScope.set('section', res.content('name'));

    if (res.isPost()) {
      // Retreiving all post data
      const post = res.getAllPost();

      // Trying to update the post
      res[appModel].dashboard().updateRow(post, (result, errors) => {
        if (errors) {
          // Getting the schema to re-render the form.
          res[appModel].dashboard().getSchema(schema => {
            schema.alert = {
              type: 'danger',
              icon: 'times',
              message: res.content('messages.update.fail')
            };

            // Assigning the error messages to the schema
            forEach(errors, error => {
              if (schema[error]) {
                schema[error].errorMessage = errors[error];
              }
            });

            res.renderScope.set('schema', schema);
            res.renderScope.set('flashData', post);
            res.renderScope.set('currentId', res.currentId);

            res.render(updateView, res.renderScope.get());
          });
        } else if (result) {
          // Getting the schema to re-render the form.
          res[appModel].dashboard().getSchema(schema => {
            // The post was added correclty
            schema.alert = {
              type: 'info',
              icon: 'check',
              message: res.content('messages.update.success')
            };

            res.renderScope.set('flashData', post);
            res.renderScope.set('currentId', res.currentId);
            res.renderScope.set('schema', schema);

            res.render(updateView, res.renderScope.get());
          });
        }
      });
    } else {
      res[appModel].dashboard().getRow(res.currentId, post => {
        res[appModel].dashboard().getSchema(schema => {
          res.renderScope.set('currentId', res.currentId);
          res.renderScope.set('flashData', post);
          res.renderScope.set('schema', schema);

          res.render(updateView, res.renderScope.get());
        });
      });
    }
  }

  /**
   * Delete
   *
   * @returns {void} void
   */
  function deleteAction() {
    const id = res.currentId;

    res[appModel].dashboard().deleteRow(id, () => {
      res.redirect(`${req.basePath}/dashboard/${currentApp}`);
    });
  }

  function removeAction() {
    const id = res.currentId;

    res[appModel].dashboard().removeRow(id, () => {
      res.redirect(`${req.basePath}/dashboard/${currentApp}`);
    });
  }

  function restoreAction() {
    const id = res.currentId;

    res[appModel].dashboard().restoreRow(id, () => {
      res.redirect(`${req.basePath}/dashboard/${currentApp}`);
    });
  }

  /**
   * Upload
   *
   * @returns {void} void
   */
  function uploadAction(req, res) {
    res.profileAllowed(() => {
      if (!res.isPost) {
        return;
      }

      // let fstream;
      const uploadedFiles = [];

      req.pipe(req.busboy);

      req.busboy.on('file', (fieldname, file, filename) => {
        const fileInfo = getFileInfo(filename);
        const name = `${fileInfo.name}-${randomCode(5)}`;
        const extension = fileInfo && fileInfo.extension;
        const filePath = `media/${name}.${extension}`;
        const url = `${__dirname}/../../../../public/${filePath}`;
        const fstream = fs.createWriteStream(url);

        uploadedFiles.push({
          url: `${res.baseUrl}/${filePath}`,
          name: `${name}.${extension}`,
          extension
        });

        file.pipe(fstream);

        fstream.on('finish', () => {
          res.json(uploadedFiles);
        });

        fstream.on('error', error => {
          console.log('error ', error); // eslint-disable-line no-console
        });
      });
    });
  }

  function allAction() {
    res[appModel].dashboard().getRows(null, result => {
      res.json(result);
    });
  }

  // * Methods
  res.appDashboard = {
    createAction,
    readAction,
    updateAction,
    deleteAction,
    removeAction,
    restoreAction,
    uploadAction,
    allAction
  };

  return next();
};

// Dependencies
import express from 'express';

// Helpers
import { getMedia } from '@helpers/media';

const Router = express.Router();
const DASHBOARD_ALLOWED_ROLES = ['god', 'admin'];
const media = getMedia();

/**
 * Dashboard index
 */
Router.get('/', (req, res) => {
  // Setting layout
  res.renderScope.default({
    layout: 'dashboard.hbs'
  });

  // If user is connected...
  res.profileAllowed(() => {
    res.render('dashboard/index', res.renderScope.get());
  }, false, false, DASHBOARD_ALLOWED_ROLES);
});

/**
 * Dashboard: Blog Actions
 */
Router.use('/:application/:action*?', (req, res) => {
  const action = res.action();

  res.profileAllowed(connectedUser => {
    // Setting layout & media
    res.renderScope.default({
      layout: 'dashboard.hbs',
      media,
      connectedUser
    });

    res.appDashboard[action](req, res);
  }, false, false, DASHBOARD_ALLOWED_ROLES);
});

export default Router;

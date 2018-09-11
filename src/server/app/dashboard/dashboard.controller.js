// Dependencies
import express from 'express';

// Utils
import { encrypt } from '@utils/security';

// Helpers
import { getMedia } from '@helpers/media';

const Router = express.Router();
const DASHBOARD_ALLOWED_ROLES = ['god', 'admin'];
const media = getMedia();

/**
 * Dashboard index
 */
Router.get('/', (req, res) => {
  if (!res.session('user')) {
    res.redirect('/dashboard/login');
  } else {
    // Setting layout
    res.renderScope.default({
      layout: 'dashboard.hbs'
    });

    // If user is connected...
    res.profileAllowed(() => {
      res.render('dashboard/index', res.renderScope.get());
    }, false, false, DASHBOARD_ALLOWED_ROLES);
  }
});

Router.post('/login', (req, res) => {
  if (res.session('user')) {
    res.redirect('/dashboard');
  }

  const { body: { username, password } } = req;

  res.profileAllowed(results => {
    if (results) {
      res.redirect('/dashboard');
    } else {
      res.redirect('/dashboard/login');
    }
  }, true, { username, password: encrypt(password) });
});

Router.get('/login', (req, res) => {
  // Setting layout
  res.renderScope.default({
    layout: 'login.hbs'
  });

  res.render('dashboard/login', res.renderScope.get());
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

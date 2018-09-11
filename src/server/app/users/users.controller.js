// Dependencies
import express from 'express';

// Utils
import { isDefined } from '@utils/is';

// Express Router
const Router = express.Router();

// Global vars
const renderOptions = {};

/**
 * Validates that the user is connected
 */
Router.get('/validation', (req, res) => {
  if (isDefined(res.session('user')) && isDefined(res.session('oauth'))) {
    const connectedUser = res.session('user');

    res.usersModel.cms().getUser({
      network: connectedUser.network,
      networkId: connectedUser.networkId,
      username: connectedUser.username,
      password: ''
    }, connectedUser => {
      if (connectedUser) {
        return res.redirect('/');
      } else {
        return res.redirect('/users/register');
      }
    });
  } else {
    return res.redirect('/');
  }
});

/**
 * Logout: destroy sessions.
 */
Router.get('/logout', (req, res) => {
  res.destroySessions();

  return res.redirect('/');
});

/**
 * Renders login view
 */
Router.get('/login', (req, res) => {
  res.send('login');
});

/**
 * Renders register view
 */
Router.get('/register', (req, res) => {
  if (isDefined(res.session('user')) && isDefined(res.session('oauth'))) {
    const { network, networkId, username, profile: { email } } = res.session('user');

    res.clearSession(['user', 'oauth']);

    return res.redirect(`${req.basePath}/register/${username}/${email}/${network}/${networkId}`);
  }

  return res.redirect('/');
});

/**
 * Renders register view
 */
Router.get('/connect/:username/:email/:networkId', (req, res) => {
  if (isDefined(res.session('userTemp'))) {
    const userTemp = res.session('userTemp');

    res.session('user', userTemp);

    res.clearSession(['userTemp']);

    return res.redirect('/');
  }

  return res.redirect('/');
});

/**
 * Register a new user
 */
Router.post('/registration', (req, res) => {
  const userData = res.getAllPost();

  res.usersModel.cms().save(userData, state => {
    if (!isDefined(state)) {
      return res.redirect('/');
    }

    renderOptions.message = res.content('Users.register.success');
    renderOptions.alertType = 'success';
    renderOptions.iconType = 'fa-check';

    if (isDefined(state[0][0].error)) {
      renderOptions.message = res.__.Db.errors[state[0][0].error];
      renderOptions.alertType = 'danger';
      renderOptions.iconType = 'fa-times';
    }

    return res.render('app/users/registered', renderOptions);
  });
});

export default Router;

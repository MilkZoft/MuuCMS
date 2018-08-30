// Dependencies
import express from 'express';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import TwitterStrategy from 'passport-twitter';

// Configuration
import { $baseUrl, $social } from '@configuration';

// Express Router
const Router = express.Router();

// Facebook
const fbOptions = {
  clientID: $social().facebook.clientId,
  clientSecret: $social().facebook.clientSecret,
  callbackURL: `${$baseUrl()}${$social().facebook.callbackUrl}`,
  profileFields: $social().facebook.profileFields
};

const twOptions = {
  consumerKey: $social().twitter.consumerKey,
  consumerSecret: $social().twitter.consumerSecret,
  callbackURL: $social().twitter.callbackUrl,
  userProfileURL: $social().twitter.userProfileURL,
  includeEmail: true
};

passport.use(
  new FacebookStrategy(fbOptions, (accessToken, refreshToken, profile, cb) => cb(null, profile))
);

passport.use(
  new TwitterStrategy(twOptions, (token, tokenSecret, profile, cb) => cb(null, profile))
);

/**
 * Redirects to twitter to do the login
 */
Router.get('/twitter', (req, res) => {
  try {
    passport.authenticate('twitter', { scope: ['include_email=true'] });
  } catch (error) {
    res.send('There was an error with the twitter api');
  }
});

/**
 * If twitter login was successful, we save oauth & user sessions
 */

Router.get('/twitter/callback', (req, res, next) => {
  passport.authenticate('twitter', { failureRedirect: '/login' }, (err, user) => {
    if (err) {
      res.redirect('/login');
    }

    const {
      _json: {
        id,
        screen_name: username,
        name,
        profile_image_url: image,
        email
      }
    } = user;


    const avatar = image.replace('_normal', '');

    const userData = {
      network: 'twitter',
      networkId: id,
      username,
      profile: {
        avatar,
        name,
        email
      }
    };

    console.log('>>>> AUTH INFO:', userData);// eslint-disable-line

    res.session('userTemp', userData);
    res.session('user', userData);

    res.redirect(`${req.basePath}/users/validation`);
  })(req, res, next);
});

Router.get('/facebook', passport.authenticate('facebook', {
  scope: $social().facebook.scope
}));

Router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', { failureRedirect: '/login' }, (err, user) => {
    if (err) {
      res.redirect('/login');
    }

    const {
      _json: {
        email,
        id,
        first_name: firstName,
        last_name: lastName,
        gender,
        picture: {
          data: {
            url: avatar
          }
        }
      }
    } = user;

    const userData = {
      network: 'facebook',
      networkId: id,
      username: email.split('@')[0],
      profile: {
        avatar,
        name: `${firstName} ${lastName}`,
        gender,
        email
      }
    };

    console.log('>>>> AUTH INFO:', userData); // eslint-disable-line

    res.session('userTemp', userData);
    res.session('user', userData);

    res.redirect(`${req.basePath}/users/validation`);
  })(req, res, next);
});

export default Router;

// Dependencies
import 'babel-polyfill';
import bodyParser from 'body-parser';
import connectBusboy from 'connect-busboy';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import exphbs from 'express-handlebars';
import express from 'express';
import path from 'path';
import passport from 'passport';
import stylus from 'stylus';
import session from 'express-session';

// Configuration
import { $views, $serverPort, $isLocal } from '@configuration';

// Utils
import { isMobile, isBot, isFirefox } from '@utils/device';

// Helpers
import * as hbsHelper from '@helpers/handlebars';
import cache from '@helpers/cache';
import contentHelper from '@helpers/content';
import postHelper from '@helpers/post';
import sessionHelper from '@helpers/session';
import templatesHelper from '@helpers/templates';
import userHelper from '@helpers/user';

// Router
import router from './router';

// Express app
const app = express();

// Middlewares
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'codejobs'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cache);
app.use(connectBusboy());
app.use(contentHelper);
app.use(cookieParser('secret'));
app.use(cors({ credentials: true, origin: true }));
app.use(postHelper);
app.use(sessionHelper);
app.use(templatesHelper);
app.use(userHelper);
app.use(passport.initialize());
app.use(passport.session());

// Compile Stylus on the fly
if ($isLocal()) {
  app.use(
    stylus.middleware({
      src: path.resolve(`${__dirname}/../shared/styles`),
      dest: path.resolve(`${__dirname}/../../public/css`),
      compile: (str, path) => stylus(str).set('filename', path).set('compress', true)
    })
  );
}

// Handlebars setup
app.engine($views().engine, exphbs({
  extname: $views().extension,
  helpers: hbsHelper,
  layoutsDir: path.join(__dirname, './views/layouts'),
  partialsDir: path.join(__dirname, './views/partials')
}));

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', $views().engine);

// GZip Compression just for Production
if (!$isLocal()) {
  app.get('*.js', (req, res, next) => {
    if (isFirefox(req.headers['user-agent'])) {
      return next();
    }

    if (!req.url.includes('bower_components') && !req.url.includes('dashboard')) {
      req.url = `${req.url}.gz`;
      res.set('Content-Encoding', 'gzip');
    }

    return next();
  });
}

// Public static
app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
app.use(express.static(path.join(__dirname, '../../public')));

// Device Detection
app.use((req, res, next) => {
  req.isBot = isBot(req.headers['user-agent']);
  req.isMobile = isMobile(req.headers['user-agent']);

  return next();
});

// Router
router(app);

// Listening
app.listen($serverPort());

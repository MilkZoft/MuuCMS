// Configuration
import { $app, $baseUrl, $dashboard, $isLocal, $theme } from '@configuration';

// Utils
import {
  availableLanguages,
  getCurrentLanguage,
  getLanguagePath,
  loadLanguage
} from '@utils/i18n';
import { isMobile } from '@utils/device';
import { sha1 } from '@utils/security';
import { getCurrentApp } from '@utils/url';
import { content, forEach } from '@utils/object';

// Importing controllers
import apiController from './app/api/api.controller';
import authController from './app/auth/auth.controller';
import contentController from './app/content/content.controller';
import dashboardController from './app/dashboard/dashboard.controller';
import usersController from './app/users/users.controller';

// Imports
import imports from './imports';

export default (app) => {
  // Content machine
  app.use('/content', contentController);

  // Security token
  app.use((req, res, next) => {
    // If securityToken session does not exist, we create a new one.
    if (!res.session('securityToken')) {
      res.session('securityToken', sha1(new Date()));
    }

    // Sending the securityToken session to locals.
    res.locals.securityToken = res.session('securityToken');

    return next();
  });

  // i18n
  app.use((req, res, next) => {
    const currentLanguage = getCurrentLanguage(req.url);

    loadLanguage(currentLanguage, data => {
      res.__ = res.locals.__ = data;
      res.locals.content = JSON.stringify(res.__);
      res.locals.currentLanguage = currentLanguage;

      return next();
    });
  });

  // base Url && basePath && currentUrl && currentApp
  app.use((req, res, next) => {
    res.currentApp = getCurrentApp(req.originalUrl);
    res.currentDashboardApp = res.locals.currentDashboardApp = getCurrentApp(req.originalUrl, true);
    res.baseUrl = res.locals.baseUrl = $baseUrl();
    req.basePath = res.locals.basePath = `${$baseUrl()}${getLanguagePath(req.url)}`;

    return next();
  });

  // Imports
  imports(app);

  // Dashboard
  app.use((req, res, next) => {
    const { query: { darkMode }, url } = req;
    const cleanUrl = `${url}/`.replace('?darkMode=on', '').replace('?darkMode=off', '').replace('//', '/');
    let theme = res.session('dashboardTheme') || $theme();

    if (darkMode === 'on') {
      theme = 'darkMode';
      res.session('dashboardTheme', 'darkMode');
    } else if (darkMode === 'off') {
      theme = 'lightMode';
      res.session('dashboardTheme', 'lightMode');
    } else if (!res.session('dashboardTheme')) {
      res.session('dashboardTheme', $theme());
    }

    res.locals.dashboard = $dashboard();
    res.locals.dashboard.theme = theme;
    res.locals.dashboard.themeIcon = theme === 'darkMode' ? 'fa-lightbulb-o' : 'fa-moon-o';
    res.locals.dashboard.themeUrl = `${cleanUrl}?darkMode=${theme === 'darkMode' ? 'off' : 'on'}`;

    const allowedApps = $app().allowed;

    // Limit to 17 characters to avoid breaking mobile
    if (res.locals.dashboard.title.length > 17) {
      res.locals.dashboard.title = res.locals.dashboard.title.substring(0, 17);
    }

    // Sidebar Menu
    res.locals.sidebarMenu = [
      {
        url: '/dashboard',
        title: content('Dashboard.modules.dashboard.name', res.__),
        contentKey: 'Dashboard.modules.dashboard.name',
        iconClass: 'fa-home',
        active: res.currentDashboardApp === 'dashboard' ? 'active' : 'dashboard'
      }
    ];

    const relationships = {};

    forEach(allowedApps, app => {
      if (allowedApps[app] && allowedApps[app].dashboard) {
        const { dashboard: { contentKey, icon } } = allowedApps[app];
        const appName = content(contentKey, res.__);

        if (allowedApps[app].backend) {
          if (allowedApps[app].schema.relationships) {
            relationships[app] = allowedApps[app].schema.relationships;
          }

          res.locals.sidebarMenu.push({
            url: `/dashboard/${app}`,
            title: appName,
            contentKey,
            iconClass: icon,
            active: res.currentDashboardApp === app ? 'active' : 'item'
          });
        }
      }
    });

    res.locals.relationships = JSON.stringify(relationships);

    res.locals.sidebarMenu.push({
      url: '/users/logout',
      title: content('Dashboard.modules.logout.name', res.__),
      contentKey: 'Dashboard.modules.logout.name',
      iconClass: 'fa-hand-o-left',
      active: 'logout'
    });

    return next();
  });

  // Device detector
  app.use((req, res, next) => {
    res.isMobile = res.locals.isMobile = isMobile(req.headers['user-agent']);

    return next();
  });


  // Slack redirection
  app.get('/slack', (req, res) => {
    const c = 'enQtMjU0MzY0MjEzMzMxLWFjMTkxZDZlY2EyMzZmNmY2Y2U5MDQ1NDNkMmE2ZTFmZjljZmFkMDYyOTZlMmI1YTU3MjM0YzMwOTM4NzI5NzQ';
    res.redirect(`https://codejobs.slack.com/join/shared_invite/${c}`);
  });

  // Controllers dispatch
  app.get('/', (req, res) => res.send('a'));
  app.use('/api', apiController);
  app.use('/auth', authController);
  app.use('/dashboard', dashboardController);
  app.use(`/:language(${availableLanguages()})/dashboard`, dashboardController);
  app.use('/users', usersController);
  app.use(`/:language(${availableLanguages()})/users`, usersController);

  // Disabling x-powered-by
  app.disable('x-powered-by');

  if ($isLocal()) {
    app.use((err, req, res) => {
      console.log(err); // eslint-disable-line no-console

      res.status(err.status || 500);

      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
  });

  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.render('error', {
      message: err.message,
      error: {}
    });
  });
};

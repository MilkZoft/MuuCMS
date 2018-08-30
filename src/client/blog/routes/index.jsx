// Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Page404 from '@error/404';
import Component from '../index';

const server = [
  { component: Component, exact: true, path: '/:language/blog/category/:category' },
  { component: Component, exact: true, path: '/:language/blog/category/:category/page/:page' },
  { component: Component, exact: true, path: '/:language/blog/page/:page' },
  { component: Component, exact: true, path: '/:language/blog/:year/:month/:day/:slug' },
  { component: Component, exact: true, path: '/:language/blog' },
  { component: Component, exact: true, path: '/es' },
  { component: Component, exact: true, path: '/en' },
  { component: Component, exact: true, path: '/' }
];

const client = (
  <Switch>
    <Route exact path={server[0].path} component={Component} />
    <Route exact path={server[1].path} component={Component} />
    <Route exact path={server[2].path} component={Component} />
    <Route exact path={server[3].path} component={Component} />
    <Route exact path={server[4].path} component={Component} />
    <Route exact path={server[5].path} component={Component} />
    <Route exact path={server[6].path} component={Component} />
    <Route exact path={server[7].path} component={Component} />
    <Route component={Page404} />
  </Switch>
);

export default {
  server,
  client
};

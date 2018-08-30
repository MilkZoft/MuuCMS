// Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Component from '../index';

const server = [
  { component: Component, exact: true, path: '/:language/contact' },
  { component: Component, exact: true, path: '/contact' }
];

const client = (
  <Switch>
    <Route exact path={server[0].path} component={Component} />
    <Route exact path={server[1].path} component={Component} />
  </Switch>
);

export default {
  server,
  client
};

// Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Component from '../index';

const server = [
  { component: Component, exact: true, path: '/:language/register/:user/:email/:network/:networkId' },
  { component: Component, exact: true, path: '/:language/register/:user' },
  { component: Component, exact: true, path: '/:language/register' },
  { component: Component, exact: true, path: '/register/:user/:email/:network/:networkId' },
  { component: Component, exact: true, path: '/register/:user' },
  { component: Component, exact: true, path: '/register' }
];

const client = (
  <Switch>
    <Route exact path={server[0].path} component={Component} />
    <Route exact path={server[1].path} component={Component} />
    <Route exact path={server[2].path} component={Component} />
    <Route exact path={server[3].path} component={Component} />
    <Route exact path={server[4].path} component={Component} />
    <Route exact path={server[5].path} component={Component} />
  </Switch>
);

export default {
  server,
  client
};

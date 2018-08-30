// Dependencies
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

// Configuration
import { $isLocal } from '@configuration';

// Utils
import { getCurrentApp } from '@utils/url';

// Redux Store
import configureStore from '@configureStore';

// Containers
import App from '@client/App';

// HTML
import html from './html';

// Initial State
import initialState from './initialState';

// Reducer
import reducer from './reducer';

// Get App Routes
import routes from './routes';

export default function serverRender() {
  return (req, res) => {
    // Current App
    const currentApp = getCurrentApp(req.url);

    // App Reducer
    const appReducer = reducer(currentApp);

    // App Routes
    const appRoutes = routes(currentApp);

    // Configure Redux Store
    const store = configureStore({
      initialState: initialState(req, res),
      appName: currentApp,
      reducer: appReducer
    });

    const promises = appRoutes.server.length > 0 && appRoutes.server.reduce((acc, route) => {
      if (matchPath(req.url, route) && route.component && route.component.initialAction) {
        acc.push(Promise.resolve(store.dispatch(route.component.initialAction('server', req))));
      }

      return acc;
    }, []);

    Promise.all(promises)
      .then(() => {
        const context = {};
        const initialState = store.getState();

        const markup = renderToString(
          <Provider store={store}>
            <App
              server
              location={req.url}
              context={context}
              routes={appRoutes}
            />
          </Provider>
        );

        const helmet = Helmet.renderStatic();

        if (context.url) {
          res.redirect(301, context.url);
        } else {
          res.send(html({
            currentApp,
            markup,
            initialState,
            isNotLocal: !$isLocal(),
            helmet
          }));
        }
      })
      .catch(e => {
        console.log('Promise error: ', e); // eslint-disable-line
      });
  };
}

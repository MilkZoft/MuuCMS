// Dependencies
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

// Utils
import { getCurrentFrontendApp } from '@utils/url';

// Redux Store
import configureStore from '../shared/redux/configureStore';

// App
import App from './App';

export default ({ reducer, routes }) => {
  // Current App
  const appName = getCurrentFrontendApp();

  // DOM
  const rootElement = document.getElementById('root');

  // Configuring Redux Store
  const store = configureStore({
    initialState: window.initialState,
    appName,
    reducer
  });

  // App Wrapper
  const renderApp = Component => {
    window.addEventListener('DOMContentLoaded', () => {
      render(
        <Provider store={store}>
          <AppContainer>
            <Component routes={routes} />
          </AppContainer>
        </Provider>,
        rootElement
      );
    });
  };

  // Rendering app
  renderApp(App);

  // HMR
  if (module.hot) {
    module.hot.accept('./App', () => {
      renderApp(require('./App').default); // eslint-disable-line
    });
  }
};

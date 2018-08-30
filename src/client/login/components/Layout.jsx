// Dependencies
import React from 'react';
import { bool } from 'prop-types';

// Utils
import { redirectTo } from '@utils/frontend';

// Componenets
import Helmet from '@ui/Helmet';
import Login from './Login';

const Layout = props => {
  const { isConnected } = props;

  if (isConnected) {
    redirectTo('/');

    return null;
  }

  return (
    <main>
      <Helmet title="Login" />

      <Login {...props} />
    </main>
  );
};

Layout.propTypes = {
  isConnected: bool
};

export default Layout;

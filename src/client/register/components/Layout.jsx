// Dependencies
import React from 'react';
import { bool } from 'prop-types';

// Utils
import { redirectTo } from '@utils/frontend';

// Componenets
import Register from './Register';

const Layout = props => {
  const { isConnected } = props;

  if (isConnected) {
    redirectTo('/');

    return null;
  }

  return (
    <main>
      <Register {...props} />
    </main>
  );
};

Layout.propTypes = {
  isConnected: bool
};

export default Layout;

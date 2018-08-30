// Dependencies
import React from 'react';
import { bool } from 'prop-types';

// Componenets
import Header from '@layout/header/Header';
import Content from '@layout/content/Content';
import Footer from '@layout/footer/Footer';
import TechnologiesMenu from '@ui/TechnologiesMenu';

// import Helmet from '@ui/Helmet';
import Profile from './Profile';

const Layout = props => {
  const { isConnected = false } = props;

  if (!isConnected) {
    return null;
  } else {
    return (
      <main>
        <Header disableSearch {...props} />
        <TechnologiesMenu {...props} external />
        <Content>
          <Profile {...props} />
        </Content>
        <Footer {...props} />
      </main>
    );
  }
};

Layout.propTypes = {
  isConnected: bool
};

export default Layout;

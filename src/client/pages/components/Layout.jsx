// Dependencies
import React from 'react';

// Shared Components
import Header from '@layout/header/Header';
import Content from '@layout/content/Content';
import Footer from '@layout/footer/Footer';
import TechnologiesMenu from '@ui/TechnologiesMenu';

// Componenets
import Page from './Page';

const Layout = props => (
  <main>
    <Header disableSearch {...props} />
    <TechnologiesMenu {...props} external />
    <Content>
      <Page {...props} />
    </Content>
    <Footer {...props} />
  </main>
);

export default Layout;

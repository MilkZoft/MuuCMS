// Dependencies
import React from 'react';

// Shared Components
import Header from '@layout/header/Header';
import Content from '@layout/content/Content';
import Footer from '@layout/footer/Footer';
// Componenets
import ForgotPassword from './ForgotPassword';

const Layout = props => (
  <main>
    <Header {...props} />
    <Content>
      <ForgotPassword {...props} />
    </Content>
    <Footer {...props} />
  </main>
);

export default Layout;

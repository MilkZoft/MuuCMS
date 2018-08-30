// Dependencies
import React from 'react';

// Shared Components
import Header from '@layout/header/Header';
import Content from '@layout/content/Content';
import Footer from '@layout/footer/Footer';

// Componenets
import Contact from './Contact';

const Layout = props => (
  <main>
    <Header {...props} />
    <Content>
      <Contact {...props} />
    </Content>
    <Footer {...props} />
  </main>
);

export default Layout;

// Dependencies
import React from 'react';

// Shared Components
import Header from '@layout/header/Header';
import Content from '@layout/content/Content';
import Footer from '@layout/footer/Footer';
// import Mural from '@ui/Mural';
import TechnologiesMenu from '@ui/TechnologiesMenu';

// Componenets
import Posts from './Posts';

const Layout = props => (
  <main>
    <Header disableSearch={false} {...props} />
    {/* <Mural /> */}
    <TechnologiesMenu {...props} />
    <Content>
      <Posts {...props} />
    </Content>
    <Footer {...props} />
  </main>
);

export default Layout;

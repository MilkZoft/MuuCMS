// Dependencies
import React from 'react';
import BaseComponent from '@baseComponent';
import Link from '@ui/Link';

// Styles
import styles from './Page404.styl';

const Page404 = () => (
  <div className={styles.page404}>
    <img alt="Not Found" src="/images/notFound.svg" />

    <div className={styles.notFound}>
      <h1>404</h1>

      <span>Parece que estás perdido</span>

      <p>La página que intentas de mostrar no existe</p>

      <Link to="/">INICIO <i className="fa fa-long-arrow-right" aria-hidden="true" /></Link>
    </div>
  </div>
);

export default BaseComponent(Page404);

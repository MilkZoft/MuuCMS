// Dependencies
import React from 'react';

// Components
import MainNav from './MainNav';

// Styles
import styles from './Header.styl';

const Header = props => (
  <header className={styles.header}>
    <MainNav {...props} />
  </header>
);

export default Header;

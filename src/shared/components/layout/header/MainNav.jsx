// Dependencies
import React, { Component } from 'react';
import { bool, func, object, oneOfType } from 'prop-types';

// Components
import Link from '@ui/Link';
import Icon from '@ui/Icon';
import Logo from './Logo';

// Styles
import styles from './MainNav.styl';

class MainNav extends Component {
  static propTypes = {
    connectedUser: oneOfType([
      object,
      bool
    ]),
    content: func
  };

  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };
  }

  handleToggleClick = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu
    }));
  }

  handleSearch = () => {
    this.setState(prevState => ({
      showSearch: !prevState.showSearch
    }));
  }

  render() {
    const { connectedUser = false, content } = this.props;
    const language = content('Site.language');

    return (
      <nav className={styles.mainNav}>
        <div className={styles.mobileNav}>
          <Logo />

          <span className={styles.hamburger} onClick={this.handleToggleClick}>
            <Icon type="bars" />
          </span>
        </div>

        <ul className={`${styles.desktopMenu} ${!this.state.showMenu && styles.hiddenMenu}`}>
          <li><Logo /></li>
          <li>{language === 'es' && <Link external to="/es/pages/temas">{content('Frontend.Global.Header.MainNav.topics')}</Link>}</li>
          <li>{language === 'es' && <Link external to="/es/pages/publicidad">{content('Frontend.Global.Header.MainNav.advertising')}</Link>}</li>
          {/* <li><Link external to="#">Empleos</Link></li> */}
          <li className={styles.languages}>
            <Link to="/en" external title="English"><span className={`${styles.flag} ${styles.en}`} /></Link> {' '}
            <Link to="/es" external title="Español"><span className={`${styles.flag} ${styles.es}`} /></Link>
          </li>
          <li />
          {!connectedUser && <li><Link className={`${styles.btn} ${styles.login}`} external to="/login">{content('Frontend.Global.Header.MainNav.login')}</Link></li>}
          {!connectedUser && <li><Link className={`${styles.btn} ${styles.register}`} external to="/register">{content('Frontend.Global.Header.MainNav.register')}</Link></li>}
          {connectedUser && connectedUser.privilege !== 'user' &&
            <li><Link className={`${styles.btn} ${styles.login}`} external to="/dashboard">Dashboard</Link></li>
          }
          {connectedUser && connectedUser.privilege === 'user' &&
            <li><Link className={`${styles.btn} ${styles.login}`} external to="#">{content('Users.hello')}, {connectedUser.username}!</Link></li>
          }
          {connectedUser &&
            <li><Link className={`${styles.btn} ${styles.register}`} external to="/users/logout">{content('Frontend.Global.Header.MainNav.logout')}</Link></li>
          }
        </ul>
      </nav>
    );
  }
}

export default MainNav;

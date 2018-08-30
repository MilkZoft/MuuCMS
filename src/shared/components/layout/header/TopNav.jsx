// Dependencies
import React from 'react';
import { bool, func } from 'prop-types';

// Components
import Icon from '@ui/Icon';
import Link from '@ui/Link';

// Styles
import styles from './TopNav.styl';

const TopNav = props => {
  const { content, isConnected, isGod } = props;

  if (!content) {
    return null;
  }

  const advertising = content('Frontend.Global.Header.MainNav.advertising');
  const logout = content('Frontend.Global.Header.MainNav.logout');
  const login = content('Frontend.Global.Header.MainNav.login');
  const register = content('Frontend.Global.Header.MainNav.register');
  const topics = content('Frontend.Global.Header.MainNav.topics');

  const menu = [
    <li key="topics">
      <Link to="#" title={topics} data-content-key="Frontend.Global.Header.MainNav.topics">
        <Icon type="list-alt" /> <span>{topics}</span>
      </Link>
    </li>,
    <li key="advertising">
      <Link to="/pages/publicidad" title={advertising} data-content-key="Frontend.Global.Header.MainNav.advertising">
        <Icon type="money" /> <span>{advertising}</span>
      </Link>
    </li>
  ];

  if (isConnected) {
    if (isGod) {
      menu.push(
        <li key="dashboard">
          <Link to="/dashboard" refresh title="Dashboard"><Icon type="cog" /> <span>Dashboard</span></Link>
        </li>
      );
    }

    menu.push(
      <li key="logout">
        <Link to="/users/logout" external refresh title={logout} data-content-key="Frontend.Global.Header.MainNav.logout">
          <Icon type="sign-out" /> <span>{logout}</span>
        </Link>
      </li>
    );
  } else {
    menu.push(
      <li key="login">
        <Link to="/login" refresh title={login} data-content-key="Frontend.Global.Header.MainNav.login">
          <Icon type="sign-in" /> <span>{login}</span>
        </Link>
      </li>,
      <li key="register">
        <Link to="/register" refresh title={register} data-content-key="Frontend.Global.Header.MainNav.register">
          <Icon type="user-plus" /> <span>{register}</span>
        </Link>
      </li>
    );
  }

  return (
    <div className={styles.topNav}>
      <div className={styles.wrapper}>
        <ul>
          {menu}
        </ul>
      </div>
    </div>
  );
};

TopNav.propTypes = {
  content: func.isRequired,
  isConnected: bool,
  isGod: bool
};

export default TopNav;

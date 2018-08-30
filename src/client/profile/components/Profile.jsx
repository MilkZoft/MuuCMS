// Dependencies
import React from 'react';
import { object } from 'prop-types';

// Styles
import styles from './Profile.styl';

const Profile = props => {
  const { connectedUser: { username, avatar, network } } = props;

  return (
    <div className={styles.Profile}>
      <div className={styles.avatar}>
        <img src={avatar} alt={username} />
      </div>
      <div className={styles.information}>
        <h2>{username}</h2>
        <span>{network}</span>
      </div>
    </div>
  );
};

Profile.propTypes = {
  connectedUser: object
};

export default Profile;

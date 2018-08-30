// Dependencies
import React from 'react';
import { object } from 'prop-types';

// Styles
import styles from './Content.styl';

const Content = props => {
  const { children } = props;

  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        {children}
      </div>
    </div>
  );
};

Content.propTypes = {
  children: object.isRequired
};

export default Content;

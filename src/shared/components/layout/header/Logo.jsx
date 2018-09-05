// Dependencies
import React from 'react';
import { bool } from 'prop-types';

// Components
import Link from '@ui/Link';

// Styles
import styles from './Logo.styl';

const Logo = props => {
  const { refresh, isotype = false, center = false } = props;

  return (
    <div className={`${styles.logo} ${center && styles.center} ${isotype && styles.isotype}`}>
      <Link to="/" title="Codejobs" refresh={refresh} external>
        <img
          src="/images/logo.png"
          alt="Codejobs"
        />

        {!isotype && (
          <span className={styles.brand}>
            <span className={styles.code}>CODE</span>
            <span className={styles.jobs}>JOBS</span>
          </span>
        )}
      </Link>
    </div>
  );
};

Logo.propTypes = {
  center: bool,
  refresh: bool,
  isotype: bool
};

export default Logo;

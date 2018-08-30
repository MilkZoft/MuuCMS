// Dependencies
import React from 'react';
import { bool } from 'prop-types';

// Utils
import { loadImage } from '@utils/frontend';

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
          src={loadImage('logo.png')}
          srcSet={`${loadImage('logo.png')} 1x, ${loadImage('logo_2x.png')} 2x`}
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

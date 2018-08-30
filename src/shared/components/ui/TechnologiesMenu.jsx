// Dependencies
import React from 'react';
import { bool, object } from 'prop-types';

// Components
import Link from '@ui/Link';
import Retina from '@ui/Retina';

// Styles
import styles from './TechnologiesMenu.styl';

const TechnologiesMenu = props => {
  const { match: { params: { category = false } }, external = false } = props;

  const language = external ? 'es/' : '';

  return (
    <div className={styles.technologiesMenu}>
      <ul>
        <li>
          <Link
            external={external}
            to={`/${language}blog/category/react`}
            className={category === 'react' ? styles.active : ''}
          >
            <Retina src="/images/icons/react.png" />
          </Link>
        </li>
        <li>
          <Link
            external={external}
            to={`/${language}blog/category/angular`}
            className={category === 'angular' ? styles.active : ''}
          >
            <Retina src="/images/icons/angular.png" />
          </Link>
        </li>
        {/* <li>
          <Link
            external={external}
            to={`/${language}blog/category/vue`}
            className={category === 'vue' ? styles.active : ''}
          >
            <Retina src="/images/icons/vue.png" />
          </Link>
        </li> */}
        <li>
          <Link
            external={external}
            to={`/${language}blog/category/node`}
            className={category === 'node' ? styles.active : ''}
          >
            <Retina src="/images/icons/node.png" />
          </Link>
        </li>
        <li>
          <Link
            external={external}
            to={`/${language}blog/category/html5`}
            className={category === 'html5' ? styles.active : ''}
          >
            <Retina src="/images/icons/html5.png" />
          </Link>
        </li>
        <li>
          <Link
            external={external}
            to={`/${language}blog/category/php`}
            className={category === 'php' ? styles.active : ''}
          >
            <Retina src="/images/icons/php.png" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

TechnologiesMenu.propTypes = {
  external: bool,
  match: object
};

export default TechnologiesMenu;

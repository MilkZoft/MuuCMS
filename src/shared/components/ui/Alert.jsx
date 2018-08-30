// Dependencies
import React from 'react';
import { string } from 'prop-types';

// Utils
import { cx } from '@utils/frontend';

// Components
import Icon from './Icon';

// Styles
import styles from './Alert.styl';

const Alert = props => {
  const {
    message,
    type,
    icon = null,
    contentKey = 'no key',
    className = 'general'
  } = props;

  return (
    <div
      className={cx(styles.alert, styles.full, styles[type], styles[className])}
      data-content-key={contentKey}
    >
      {icon && <Icon type={icon} />}{icon && ' '}{message}
    </div>
  );
};

Alert.propTypes = {
  contentKey: string,
  className: string,
  icon: string,
  message: string.isRequired,
  type: string
};

export default Alert;

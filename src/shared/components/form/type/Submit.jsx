// Dependencies
import React from 'react';
import { bool, func, string } from 'prop-types';

// Utils
import { attrs } from '@utils/frontend';

// Components
import Input from './Input';

const Submit = props => {
  const {
    className,
    id,
    name,
    onClick,
    placeholder,
    type = 'button',
    value = '',
    contentKey,
    disabled
  } = props;

  return (
    <div className="Submit">
      <Input
        {
          ...attrs({
            className,
            id,
            name,
            onClick,
            placeholder,
            type,
            value,
            contentKey,
            disabled
          })
        }
      />
    </div>
  );
};

Submit.propTypes = {
  className: string,
  contentKey: string,
  id: string,
  name: string,
  onClick: func,
  placeholder: string,
  type: string,
  value: string,
  disabled: bool
};

export default Submit;

// Dependencies
import React from 'react';
import { bool, func, string } from 'prop-types';

// Utils
import { attrs } from '@utils/frontend';

// Components
import Input from './Input';

const Password = props => {
  const {
    autoFocus = false,
    className,
    id,
    name,
    onChange,
    placeholder,
    type = 'password',
    value = '',
    contentKey
  } = props;

  return (
    <div className="Password">
      <Input
        {
          ...attrs({
            autoFocus,
            className,
            id,
            name,
            onChange,
            placeholder,
            type,
            value,
            contentKey
          })
        }
      />
    </div>
  );
};

Password.propTypes = {
  autoFocus: bool,
  className: string,
  contentKey: string,
  id: string,
  name: string,
  onChange: func,
  placeholder: string,
  type: string,
  value: string
};

export default Password;

// Dependencies
import React from 'react';
import { bool, func, string } from 'prop-types';

// Utils
import { attrs } from '@utils/frontend';

// Components
import Input from './Input';

const Email = props => {
  const {
    autoFocus = false,
    className,
    id,
    name,
    onChange,
    pattern = '[^@]+@[^@]+.[a-zA-Z]{2,}',
    placeholder,
    type = 'email',
    required = true,
    value = '',
    contentKey
  } = props;

  return (
    <div className="Email">
      <Input
        {
        ...attrs({
          autoFocus,
          className,
          id,
          name,
          onChange,
          pattern,
          placeholder,
          required,
          type,
          value,
          contentKey
        })
        }
      />
    </div>
  );
};

Email.propTypes = {
  autoFocus: bool,
  className: string,
  contentKey: string,
  id: string,
  name: string,
  onChange: func,
  pattern: string,
  placeholder: string,
  required: bool,
  type: string,
  value: string
};

export default Email;

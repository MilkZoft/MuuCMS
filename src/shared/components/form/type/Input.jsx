// Dependencies
import React from 'react';
import { string, bool, func } from 'prop-types';

// Utils
import { attrs } from '@utils/frontend';

const Input = props => {
  const {
    autoComplete,
    autoFocus,
    className,
    contentKey,
    id,
    name,
    noWrapper,
    onBlur,
    onChange,
    onClick,
    placeholder,
    type,
    value,
    disabled
  } = props;

  const input = (
    <input
      {
      ...attrs({
        'data-content-key': contentKey,
        autoComplete,
        autoFocus,
        className,
        id,
        name,
        onBlur,
        onChange,
        onClick,
        placeholder,
        type,
        value,
        disabled
      })
      }
    />
  );

  if (!noWrapper) {
    return <p>{input}</p>;
  }

  return input;
};

Input.propTypes = {
  autoComplete: string,
  autoFocus: bool,
  className: string,
  contentKey: string,
  id: string,
  name: string,
  noWrapper: bool,
  onBlur: func,
  onChange: func,
  onClick: func,
  placeholder: string,
  type: string,
  value: string
};

export default Input;

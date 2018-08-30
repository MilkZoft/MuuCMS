// Dependencies
import React from 'react';
import { string, bool, func } from 'prop-types';

// Utils
import { attrs } from '@utils/frontend';

// Components
import Input from './Input';

const Text = props => {
  const {
    autoComplete = 'off',
    autoFocus = false,
    className,
    contentKey,
    id,
    name,
    noWrapper = false,
    onBlur,
    onChange,
    placeholder,
    type = 'text',
    value = ''
  } = props;

  const input = (
    <Input
      {
      ...attrs({
        autoComplete,
        autoFocus,
        className,
        contentKey,
        id,
        name,
        noWrapper,
        onBlur,
        onChange,
        placeholder,
        type,
        value
      })
      }
    />
  );

  if (!noWrapper) {
    return <div className="Text">{input}</div>;
  }

  return input;
};

Text.propTypes = {
  autoComplete: string,
  autoFocus: bool,
  className: string,
  contentKey: string,
  id: string,
  name: string,
  noWrapper: bool,
  onBlur: func,
  onChange: func,
  placeholder: string,
  type: string,
  value: string
};

export default Text;

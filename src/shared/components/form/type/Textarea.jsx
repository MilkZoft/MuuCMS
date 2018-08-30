// Dependencies
import React from 'react';
import { bool, string, func, number } from 'prop-types';

// Utils
import { attrs } from '@utils/frontend';

const Textarea = props => {
  const {
    autoFocus = false,
    className,
    id,
    name,
    value = '',
    contentKey,
    onChange = () => { },
    placeholder,
    maxLength,
    disabled
  } = props;

  return (
    <div className="Textarea">
      <textarea
        {
          ...attrs({
            autoFocus,
            id,
            name,
            className,
            contentkey: contentKey,
            value,
            onChange,
            placeholder,
            maxLength,
            disabled
          })
        }
      />
    </div>
  );
};

Textarea.propTypes = {
  autoFocus: bool,
  className: string,
  contentKey: string,
  id: string,
  name: string,
  value: string,
  onChange: func,
  placeholder: string,
  maxLength: number,
  disabled: bool
};

export default Textarea;

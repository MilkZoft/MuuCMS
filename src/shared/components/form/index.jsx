// Dependencies
import React from 'react';
import { array, string } from 'prop-types';

// Utils
import { attrs } from '../../utils/frontend';

const Form = props => {
  const {
    id,
    action,
    className = 'Form',
    method,
    children
  } = props;

  return (
    <form {...attrs({ id, action, className, method })}>
      {children}
    </form>
  );
};

Form.propTypes = {
  action: string,
  children: array,
  className: string,
  id: string,
  method: string
};

export default Form;

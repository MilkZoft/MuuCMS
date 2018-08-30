// Dependencies
import React from 'react';
import { string, number } from 'prop-types';

const TextCounter = props => {
  const { className, left, total } = props;
  const percentage = left / total * 100;
  const style = {};

  if (percentage > 90) {
    style.color = 'red';
  } else if (percentage <= 2) {
    style.color = 'orange';
  }

  return <span className={className} style={style}>{left}/{total}</span>;
};

TextCounter.propTypes = {
  className: string,
  left: number,
  total: number
};

export default TextCounter;

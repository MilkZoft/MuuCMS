// Dependencies
import React from 'react';
import { string } from 'prop-types';

const CopyRight = props => {
  const { className = 'CopyRight' } = props;

  return (
    <div className={className}>
      {(new Date()).getFullYear()} © Codejobs
    </div>
  );
};

CopyRight.propTypes = {
  className: string
};

export default CopyRight;

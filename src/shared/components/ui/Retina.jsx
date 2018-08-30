// Dependencies
import React from 'react';
import { string } from 'prop-types';

const Retina = props => {
  const { src } = props;
  const parts = src.split('/');
  const filename = parts.pop();
  const image2x = `${parts.join('/')}/${filename.replace('.', '_2x.')}`;

  return <img alt={filename} src={src} srcSet={`${src} 1x, ${image2x} 2x`} />;
};

Retina.propTypes = {
  src: string
};

export default Retina;

// Dependencies
import React from 'react';
import { array, string } from 'prop-types';
import ReactHelmet from 'react-helmet';

// Configuration
import { $app } from '@configuration';

// Utils
import { sanitizeMetas } from '@utils/frontend';

const Helmet = props => (
  <ReactHelmet
    title={`${$app().mainTitle} - ${props.title}`}
    meta={sanitizeMetas(props.meta)}
  />
);

Helmet.propTypes = {
  meta: array,
  title: string
};

export default Helmet;

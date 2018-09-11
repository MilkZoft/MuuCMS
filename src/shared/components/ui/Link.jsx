// Dependencies
import React from 'react';
import { bool, string } from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';

// Utils
import { getLink } from '@utils/frontend';

const Link = props => {
  const { to, refresh = false, external = false } = props;
  const linkProps = { ...props };
  const url = getLink(to, external);
  let newRefresh = refresh;

  if (to.indexOf('http') !== -1 || external) {
    newRefresh = true;
  }

  delete linkProps.to;
  delete linkProps.dispatch;
  delete linkProps.currentLanguage;
  delete linkProps.refresh;
  delete linkProps.external;

  if (newRefresh) {
    return <a href={url} {...linkProps} />;
  }

  return (
    <ReactRouterLink {...linkProps} to={url} />
  );
};

Link.propTypes = {
  to: string,
  refresh: bool,
  external: bool
};

export default Link;

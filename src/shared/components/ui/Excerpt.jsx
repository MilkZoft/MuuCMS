// Dependencies
import React from 'react';
import { string } from 'prop-types';
import LazyLoad from 'react-lazyload';

// Components
import Link from '@ui/Link';

// Configuration
import { $isTest } from '@configuration';

// Styles
import styles from './Excerpt.styl';

const Excerpt = props => {
  const { src, content, url } = props;
  let image;

  if (src) {
    const parts = src.split('/');
    const filename = parts.pop();

    image = (
      <LazyLoad height={200}>
        <p>
          <Link to={url}>
            <img className={styles.image} alt={filename} src={src} />
          </Link>
        </p>
      </LazyLoad>
    );

    if ($isTest()) {
      image = <p><img className={styles.image} alt={filename} src={src} /></p>;
    }
  }

  if (src && content) {
    return (
      <div>
        {image}
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }

  if (src) {
    return image;
  }

  return <p dangerouslySetInnerHTML={{ __html: content }} />;
};

Excerpt.propTypes = {
  src: string,
  content: string,
  url: string
};

export default Excerpt;

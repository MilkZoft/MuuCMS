// Dependencies
import React, { Component } from 'react';
import { func, object } from 'prop-types';

// Components
import Helmet from '@ui/Helmet';

// Utils
import { isFirstRender } from '@utils/frontend';

// Styles
import styles from './Page.styl';

class Page extends Component {
  static propTypes = {
    fetchPage: func.isRequired,
    req: object,
    page: object.isRequired
  };

  componentDidMount() {
    const { fetchPage, req } = this.props;

    fetchPage('client', req);
  }

  render() {
    const { page, page: { title, content } } = this.props;

    if (isFirstRender(page)) {
      return null;
    }

    return (
      <div>
        <div className={styles.page}>
          <Helmet title={title} />

          <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  }
}

export default Page;

// Dependencies
import React, { Component } from 'react';
import { func, object } from 'prop-types';

// Utils
import { isFirstRender } from '@utils/frontend';

// Components
import Helmet from '@ui/Helmet';
import Pagination from '@ui/Pagination';
import Post from './Post';

// PropTypes Shapes
import shapes from '../shapes';

// Utils
import { isSinglePost } from '../utils';

// Styles
import styles from './Posts.styl';

class Posts extends Component {
  static propTypes = {
    fetchPosts: func.isRequired,
    req: shapes.req,
    content: func.isRequired,
    posts: shapes.posts.isRequired,
    match: shapes.match.isRequired,
    apiInfo: shapes.apiInfo.isRequired,
    comments: object.isRequired,
    getComments: func.isRequired,
    saveComment: func.isRequired
  };

  componentDidMount() {
    const { fetchPosts, match: { params } } = this.props;

    fetchPosts('client', params);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPosts, match: { params } } = this.props;
    const { match: { params: nextParams } } = nextProps;

    if (nextParams !== params) {
      window.scrollTo(0, 0);
      fetchPosts('client', nextParams);
    }
  }

  render() {
    const {
      apiInfo: {
        rows = 0
      },
      posts,
      content,
      match: {
        params
      },
      comments,
      getComments,
      saveComment
    } = this.props;

    if (isSinglePost(params)) {
      return <Post {...this.props} />;
    }

    if (isFirstRender(posts)) {
      return null;
    }

    const paginationUrl = params && params.category
      ? `blog/category/${params.category}/page/`
      : 'blog/page/';

    return (
      <div>
        <div className={styles.posts}>
          <Helmet title="Blog" />

          {posts.map(post => (
            <Post
              saveComment={saveComment}
              getComments={getComments}
              key={post.id}
              post={post}
              content={content}
              comments={comments}
            />
          ))}
        </div>

        <Pagination page={Number(params.page)} rows={Number(rows)} url={paginationUrl} />
      </div>
    );
  }
}

export default Posts;

// Dependencies
import React, { Component, Fragment } from 'react';
import { bool, func, object } from 'prop-types';

// Components
import Comments from '@client/comments';
import Helmet from '@ui/Helmet';
import Icon from '@ui/Icon';
import Link from '@ui/Link';

// Utils
import { getMonthContentKey } from '@utils/date';
import { cx, getFirstParagraph, getPostImage, isFirstRender, getLink } from '@utils/frontend';
import { getHighlightCode } from '../utils';

// PropTypes Shapes
import shapes from '../shapes';

// Styles
import styles from './Post.styl';

class Post extends Component {
  static propTypes = {
    content: func.isRequired,
    post: shapes.post,
    singlePost: shapes.singlePost,
    comments: object.isRequired,
    match: object,
    getComments: func.isRequired,
    saveComment: func.isRequired,
    deleteComment: func,
    isConnected: bool,
    isGod: bool
  };

  constructor(props) {
    super(props);

    this.state = {
      post: false
    };
  }

  getPostData = (post, key, single = false) => {
    const { year, month, day, slug, title, excerpt, content, codes, author } = post;
    const url = `blog/${year}/${month}/${day}/${slug}`;
    let firstParagraph = excerpt;
    let postImage = '';

    if (!excerpt) {
      firstParagraph = getFirstParagraph(content, url);
      postImage = getPostImage(content);
    }

    return {
      title,
      url,
      content: single ? content : firstParagraph,
      codes,
      author,
      key,
      single,
      year,
      month,
      day,
      postImage
    };
  }

  getParsedContent = (content, codes = false) => {
    // Inserting Ads
    content = content.replace(/<p>\[Ad:Sky\]<\/p>/g, '');

    if (!codes) {
      return content;
    }

    return getHighlightCode(content, codes);
  }

  renderPostBody(post) {
    const { content } = this.props;
    const {
      title,
      url,
      content: postContent,
      codes,
      key,
      single,
      author,
      year,
      month,
      day,
      postImage
    } = post;
    const authorLink = `/users/${author}`;
    const monthName = content(getMonthContentKey(month));
    const createdAt = `${monthName} ${day}, ${year}`;
    const parsedContent = single ? this.getParsedContent(postContent, codes) : null;
    const showContent = typeof postContent === 'string'
      ? <p dangerouslySetInnerHTML={{ __html: postContent }} />
      : postContent;

    let helmet;
    let readMoreLink = (
      <Link to={url} className={styles.readMore} data-content-key="Frontend.Blog.Post.readMore">
        {content('Frontend.Blog.Post.readMore')} <Icon type="caret-right" />
      </Link>
    );

    let postClass = styles.post;

    if (single) {
      helmet = (
        <Helmet
          title={title}
          meta={[
            { name: 'title', content: title },
            { name: 'description', content: parsedContent },
            { property: 'og:url', content: getLink(url, false, true, true) },
            { property: 'og:title', content: title },
            { property: 'og:image', content: getLink(postImage, false, true) },
            { property: 'og:type', content: 'article' }
          ]}
        />
      );
      readMoreLink = null;
      postClass = cx(styles.post, styles.single);
    }

    return (
      <div className={postClass} key={key}>
        {helmet}

        <h2>
          <Link to={url}>{title}</Link>
        </h2>

        <p className={styles.information} data-content-key="Frontend.Blog.Post.publishedBy">
          {content('Frontend.Blog.Post.publishedBy')} <Link to={authorLink} className={styles.author}>{author}</Link>
          &nbsp; - {createdAt}
        </p>

        {single &&
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: parsedContent }} />
        }

        {!single && showContent}

        <p>
          {readMoreLink}
        </p>
      </div>

    );
  }

  renderSinglePost(post) {
    const {
      content,
      comments,
      match: { params },
      getComments,
      saveComment,
      deleteComment,
      isConnected,
      isGod
    } = this.props;

    return (
      <Fragment>
        {this.renderPostBody(this.getPostData(post[0], 0, true))}

        <Comments
          isConnected={isConnected}
          isGod={isGod}
          content={content}
          comments={comments}
          urlParams={params}
          getComments={getComments}
          saveComment={saveComment}
          deleteComment={deleteComment}
        />
      </Fragment>
    );
  }

  renderPost(post, key) {
    return this.renderPostBody(this.getPostData(post, key));
  }

  render() {
    const { post, singlePost } = this.props;

    if (post) {
      return this.renderPost(post);
    } else if (!isFirstRender(this.state.post ? this.state.post : singlePost)) {
      return this.renderSinglePost(this.state.post ? this.state.post : singlePost);
    }

    return null;
  }
}

export default Post;

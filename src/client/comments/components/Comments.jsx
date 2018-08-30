// Dependencies
import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';
import nl2br from 'react-nl2br';

// Components
import Textarea from '@form/type/Textarea';
import Submit from '@form/type/Submit';
import TextCounter from '@ui/TextCounter';
import Icon from '@ui/Icon';

// Utils
import { cx } from '@utils/frontend';

// Styles
import styles from './Comments.styl';

class Comment extends Component {
  static propTypes = {
    getComments: func.isRequired,
    saveComment: func.isRequired,
    deleteComment: func.isRequired,
    comments: object.isRequired,
    urlParams: object.isRequired,
    isConnected: bool.isRequired,
    isGod: bool.isRequired,
    content: func
  }

  state = {
    comment: ''
  }

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate() {
    const { comments: { inserted } } = this.props;

    if (inserted) {
      this.fetchComments();
    }
  }

  fetchComments = () => {
    const { getComments, urlParams } = this.props;
    const newUrlParams = Object.assign({}, urlParams);

    newUrlParams.type = 'blog';

    // Fetching comments of type blog
    getComments(newUrlParams);
  }

  handleDeleteComment = (commentId, postId) => {
    const { deleteComment, isGod } = this.props;

    if (isGod) {
      deleteComment({ commentId, postId });
      this.fetchComments();
    }
  }

  handleTextField = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  }

  handleSubmitForm = () => {
    const { saveComment, urlParams: { slug, language } } = this.props;

    if (this.state.comment.length > 20) {
      this.setState({
        comment: ''
      });
      saveComment({ comment: this.state.comment, slug, type: 'blog', language });
    }
  }

  buildComment = () => {
    const { comments: { data }, isGod } = this.props;

    if (!data || !data.length) {
      return null;
    }

    return data.map(({ commentId, postId, avatar, comment, username, date }, index) => {
      const img = avatar || '/images/default.png';

      return (
        <div key={index} className={styles.commentContainer}>
          <div className={styles.commentImg}>
            <div className={styles.commentImgWrapper}>
              <img src={img} alt="Avatar" />
            </div>
          </div>

          <div className={styles.commentText}>
            <div className={styles.commentTextHead}>
              <p className={styles.commentTextHeadAuthor}>{username || ''}</p>
              <p className={styles.commentTextHeadTime}>{date || ''}</p>
            </div>

            <p className={styles.commentTextBody}>{nl2br(comment) || ''}</p>

            {isGod && (
              <Icon
                onClick={() => { this.handleDeleteComment(commentId, postId); }}
                className={styles.trash}
                type="trash"
              />
            )}
          </div>
        </div>
      );
    });
  }

  buildCommentForm = () => {
    const { content, isConnected } = this.props;
    const { comment } = this.state;

    const maxLength = 1000;
    const isDisabled = !isConnected || comment.length <= 20;

    return (
      <div className={styles.commentForm}>
        <Textarea
          noWrapper
          disabled={!isConnected}
          placeholder={content('Frontend.Comments.Textarea.placeholder')}
          className={styles.commentField}
          name="name"
          onChange={e => { this.handleTextField(e, 'comment'); }}
          value={comment}
          contentKey="Frontend.Contact.forms.fields.name"
          maxLength={maxLength}
        />

        <TextCounter
          className={styles.textCounter}
          left={comment.length}
          total={maxLength}
        />

        <Submit
          disabled={isDisabled}
          className={cx(styles.btn, !isDisabled ? styles.primary : styles.default)}
          name="register"
          value={content('Frontend.Comments.Submit.label')}
          onClick={this.handleSubmitForm}
          data-content-key="Frontend.Contact.Buttons.send"
        />

        {!isConnected
          && (
            <span
              className={styles.noConnected}
              dangerouslySetInnerHTML={{ __html: content('Frontend.Comments.Submit.noConnected') }}
            />
          )
        }
      </div>
    );
  }

  render() {
    return (
      <div className={styles.comment}>
        <div className={styles.wrapper}>
          {this.buildCommentForm()}
          {this.buildComment()}
        </div>
      </div>
    );
  }
}

export default Comment;

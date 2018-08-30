import { sanitize } from '@utils/string';
import { currentDateAndTime } from '@utils/date';

export default (req, res, next) => {
  async function fetchComments() {
    // method get is required
    if (!req.method === 'GET') {
      return {
        error: 'This function needs to be called by GET method'
      };
    }

    const { query: { slug, day, month, year, type } } = req;

    // Slug information is required
    if (!slug || !day || !month || !year || !type) {
      return {
        error: 'All parameters are required'
      };
    }

    const records = await res.commentModel.cms().getComments({
      slug,
      day,
      month,
      year,
      commentType: type
    });

    if (records.error) {
      records.error = 'Error in the query';
    }

    return records;
  }

  async function saveComment() {
    if (!req.method === 'POST') {
      return { error: 'This function needs to be called by POST method' };
    }

    if (!req.body) {
      return { error: 'All parameters are required' };
    }

    const requiredFields = {
      type: req.body.type,
      slug: req.body.slug,
      comment: req.body.comment,
      language: req.body.language
    };

    const errorMessages = {};

    Object.keys(requiredFields).map(field => {
      const fieldValue = requiredFields[field];

      if (!fieldValue || !String(fieldValue).length) {
        errorMessages[field] = 'Is required';
      }

      return true;
    });

    if (Object.keys(errorMessages).length) {
      return {
        error: errorMessages
      };
    }

    // Extract an clean required info for queries
    const comment = sanitize(req.body.comment);
    const slug = sanitize(req.body.slug);
    const language = sanitize(req.body.language);
    const type = sanitize(req.body.type);
    const { network, networkId, username } = res.session('user');

    try {
      // Set this data to find the blog post
      const data = {
        fields: 'id',
        table: 'blog',
        language,
        searchTerm: slug,
        searchBy: ['slug'],
        debug: {
          filename: 'comment.model.js',
          method: 'getRow'
        }
      };

      // Perform this query to find the blog's id
      const postId = await res.commentModel.cms().searchInDb(data);

      if (!postId) {
        return {
          error: 'Error getting the post information'
        };
      }

      // Get user information
      const userInfo = await res.usersModel.cms().getUserAsync({ network, username, networkId });

      // The user exists in db?
      if (!userInfo) {
        return { error: 'User is not valid' };
      }

      // save the comment in db
      let dateToSave = {
        comment,
        language,
        date: currentDateAndTime(),
        type
      };

      const commentResult = await res.commentModel.cms().saveComment(dateToSave);

      // validate response from query
      if (!commentResult) {
        return {
          error: 'Error saving the comment'
        };
      }

      // save relation ship between comments - user - blogPost
      dateToSave = {
        userId: userInfo.id,
        commentId: commentResult.id,
        postId: postId[0].id
      };

      const commentRelationShip = await res.commentModel.cms().saveCommentRelationship(dateToSave);

      if (!commentRelationShip) {
        return { error: 'Error saving the comment' };
      }

      return { inserted: true };
    } catch (error) {
      console.log('Comment API Error:', error); // eslint-disable-line no-console
    }
  }

  function deleteComment(commentId, postId) {
    res.commentModel.cms().deleteComment(commentId, postId);

    return { deleted: true };
  }

  // Methods
  res.commentAPI = {
    fetchComments,
    saveComment,
    deleteComment
  };

  return next();
};

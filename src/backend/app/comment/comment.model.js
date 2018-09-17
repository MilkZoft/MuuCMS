// Helpers
import * as Model from '@helpers/model';

// Utils
import timeAgo from 'node-time-ago';

export default (req, res, next) => {
  // * Global vars
  const table = 'comment';
  const modelName = `${table}Model`;

  function cms() {
    /**
     * Get comment for a specific post and user
     *
     * @param {object}, {userId,postId} info to perform the query
     * @returns {Array} array of records
     */
    async function getComments(data) {
      const { slug, day, month, year, commentType } = data;
      const c = 'comm';
      const b = 'blog';
      const u = 'users';
      const r = 're_comments_users_blog';

      const sqlQuery = `
          SELECT
            ${c}.id as commentId, ${c}.comment, ${c}.language, ${c}.date, ${c}.type,
            ${b}.id as postId, ${b}.slug,
            ${u}.fullName, ${u}.username, ${u}.avatar
          FROM ${r} as re_comment
            JOIN comments as ${c} ON ${c}.id = re_comment.commentId
            JOIN blog as ${b} ON ${b}.id = re_comment.postId
            JOIN users as ${u} ON ${u}.id = re_comment.userId
          WHERE
            ${c}.type='${commentType}'
            AND ${b}.slug = '${slug}'
            AND ${b}.day = '${day}'
            AND ${b}.month = '${month}'
            AND ${b}.year = '${year}'
      `;

      const responseFromQuery = await Model.queryAsync(sqlQuery);

      // map each comment and set the time ago for each date
      if (responseFromQuery && responseFromQuery.length) {
        return responseFromQuery.map(comment => {
          const timeAgoDate = timeAgo(comment.date);
          const commentCopy = Object.assign({}, comment, { date: timeAgoDate });
          return commentCopy;
        });
      } else {
        return responseFromQuery;
      }
    }

    /**
     * Look for a record in the db
     *
     * @param {object}, data with configuration values to perform the query
     * @returns {Array} array of records
     */
    async function searchInDb(data) {
      const queryResult = await Model.searchAsync(data);
      return queryResult;
    }

    async function saveComment(data) {
      const queryResult = await Model.insertRowAsync('comments', data);
      return queryResult;
    }

    async function saveCommentRelationship(data) {
      const queryResult = await Model.insertRowAsync('re_comments_users_blog', data);
      return queryResult;
    }

    function deleteComment(commentId, postId) {
      const r = 're_comments_users_blog';
      const c = 'comments';

      const sqlQuery = `
        DELETE ${c}, ${r}
        FROM ${c}, ${r}
        WHERE
          ${c}.id = '${commentId}'
          AND ${r}.commentId = '${commentId}'
          AND ${r}.postId = '${postId}'
      `;

      const responseFromQuery = Model.queryAsync(sqlQuery);

      return responseFromQuery;
    }

    return {
      getComments,
      searchInDb,
      saveComment,
      saveCommentRelationship,
      deleteComment
    };
  }

  // Methods
  res[modelName] = {
    cms
  };

  return next();
};

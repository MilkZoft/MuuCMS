// Dependencies
import express from 'express';

// Utils
import { isFunction, isDefined } from '@utils/is';
import { camelCase, sanitize } from '@utils/string';

// Express Router
const Router = express.Router();

// GET Method
Router.get('/blog/:endpoint*?', (req, res) => {
  const endpointMethod = camelCase(req.params.endpoint);
  const data = sanitize(req.query);

  if (isFunction(res.blogAPI[endpointMethod])) {
    return res.blogAPI[endpointMethod](data, (cache, response, rows, format = 'json') => {
      if (response && format === 'json') {
        res.json({
          information: {
            cache,
            total: response.length,
            rows,
            params: data
          },
          response
        });
      } else if (response && format === 'xml') {
        res.set('Content-Type', 'text/xml');
        res.send(response);
      } else {
        res.json({
          error: true
        });
      }
    });
  }

  return res.json({
    error: true
  });
});

Router.get('/pages/:endpoint*?', (req, res) => {
  const endpointMethod = camelCase(req.params.endpoint);
  const data = sanitize(req.query);

  if (isFunction(res.pagesAPI[endpointMethod])) {
    return res.pagesAPI[endpointMethod](data, (cache, response, rows, format = 'json') => {
      if (response && format === 'json') {
        res.json({
          information: {
            cache,
            total: response.length,
            rows,
            params: data
          },
          response
        });
      } else {
        res.json({
          error: true
        });
      }
    });
  }

  return res.json({
    error: true
  });
});

Router.get('/users/:endpoint*?', (req, res) => {
  const endpointMethod = camelCase(req.params.endpoint);

  if (isFunction(res.usersAPI[endpointMethod])) {
    return res.usersAPI[endpointMethod](response => {
      if (response) {
        res.json({
          response
        });
      } else {
        res.json({
          error: true
        });
      }
    });
  } else {
    res.json({
      error: true
    });
  }
});

// POST Method
Router.post('/users/:endpoint*?', (req, res) => {
  const endpointMethod = camelCase(req.params.endpoint);

  if (isFunction(res.usersAPI[endpointMethod])) {
    return res.usersAPI[endpointMethod](response => {
      if (response) {
        res.json({
          response
        });
      } else {
        res.json({
          error: res.content('Api.errors.noData')
        });
      }
    });
  } else {
    return res.json({
      error: res.content('Api.errors.noData')
    });
  }
});

Router.get('/comment', async (req, res) => {
  const comments = await res.commentAPI.fetchComments();

  if (comments.error) {
    res.send({ data: [], error: comments.error });
  } else {
    res.send({ data: comments });
  }
});

Router.get('/comment/delete', async (req, res) => {
  const { query: { commentId, postId } } = req;
  const connectedUser = res.session('user');

  if (connectedUser.privilege !== 'god') {
    res.send({ error: 'You don\'t have permission to perform this action' });
  }

  const result = res.commentAPI.deleteComment(commentId, postId);

  res.send(result);
});

Router.post('/comment', async (req, res) => {
  // validate user session
  if (isDefined(res.session('user')) && isDefined(res.session('oauth'))) {
    const commentResponse = await res.commentAPI.saveComment();
    // check the response
    if (commentResponse.error) {
      res.status(400).send(commentResponse);
    } else {
      res.send({ data: commentResponse });
    }
  } else {
    res.status(400).send({ inserted: false });
  }
});

Router.get('/forgotPassword', async (req, res) => {
  const result = await res.forgotPasswordAPI.checkEmail();
  if (result.error) {
    res.send({ response: { isValid: false } });
  } else {
    res.send(result);
  }
});

Router.post('/forgotPassword', async (req, res) => {
  const result = await res.forgotPasswordAPI.resetPassword();
  if (result.error) {
    res.send({ response: { inserted: false }, error: result.error });
  } else {
    res.send(result);
  }
});


Router.post('/contact', (req, res) => res.contactAPI.saveContact(response => res.send(response)));

export default Router;

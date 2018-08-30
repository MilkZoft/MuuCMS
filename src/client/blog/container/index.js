// Dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Shared Components
import BaseComponent from '@baseComponent';

// Components
import Layout from '../components/Layout';

// Actions
import { fetchPosts } from '../actions';
import { getComments, saveComment, deleteComment } from '../../comments/actions';

export default connect(({ blog, content, req, comments }) => ({
  posts: blog.posts,
  singlePost: blog.post,
  apiInfo: blog.apiInfo,
  content: content.content,
  req,
  comments
}), dispatch => bindActionCreators(
  {
    fetchPosts,
    getComments,
    saveComment,
    deleteComment
  },
  dispatch
))(BaseComponent(Layout));

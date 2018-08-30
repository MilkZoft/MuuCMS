// Dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Shared Components
import BaseComponent from '@baseComponent';

// Components
import Layout from '../components/Layout';

// Actions
import { fetchPage } from '../actions';

export default connect(({ pages, req }) => ({
  page: pages.page,
  req
}), dispatch => bindActionCreators(
  {
    fetchPage
  },
  dispatch
))(BaseComponent(Layout));

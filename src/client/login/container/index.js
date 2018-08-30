// Dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Shared Components
import BaseComponent from '@baseComponent';

// Components
import Layout from '../components/Layout';

// Actions
import { doLogin } from '../actions';

export default connect(null, dispatch => bindActionCreators(
  {
    doLogin
  },
  dispatch
))(BaseComponent(Layout));

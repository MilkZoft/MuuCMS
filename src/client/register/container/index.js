// Dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Shared Components
import BaseComponent from '@baseComponent';

// Actions
import { doRegister } from '../actions';

// Components
import Layout from '../components/Layout';

export default connect(({ content, users }) => ({
  content: content.content,
  registrationStatus: users.registrationStatus
}), dispatch => bindActionCreators(
  {
    doRegister
  },
  dispatch
))(BaseComponent(Layout));

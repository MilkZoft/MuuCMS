// Dependencies
import { connect } from 'react-redux';

// Shared Components
import BaseComponent from '@baseComponent';

// Components
import Layout from '../components/Layout';

// Actions
import { checkForgotPasswordEmail, resetPassword } from '../actions';

export default connect(
  state => ({
    forgotPassword: state.forgotPassword,
    content: state.connect,
    req: state.req
  }),
  {
    resetPassword,
    checkForgotPasswordEmail
  }
)(BaseComponent(Layout));

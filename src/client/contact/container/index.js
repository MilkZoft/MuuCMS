// Dependencies
import { connect } from 'react-redux';

// Shared Components
import BaseComponent from '@baseComponent';

// Components
import Layout from '../components/Layout';

// actions
import { sendContact } from '../actions';


export default connect(
  state => ({
    contact: state.contact,
    content: state.connect
  }),
  { sendContact }
)(BaseComponent(Layout));

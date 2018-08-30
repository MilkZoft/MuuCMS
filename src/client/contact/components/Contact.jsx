// Dependencies
import React, { Component } from 'react';
import { func, object } from 'prop-types';
// common components
import Form from '@form';
import Text from '@form/type/Text';
import TextArea from '@form/type/Textarea';
import { cx, redirectTo } from '@utils/frontend';
import Icon from '@ui/Icon';
import Submit from '@form/type/Submit';
// utils
import { isEmail } from '@utils/is';

// Styles
import styles from './Contact.styl';

class Contact extends Component {
  static propTypes = {
    content: func.isRequired,
    sendContact: func.isRequired,
    contact: object.isRequired
  }

  state = {
    name: '',
    email: '',
    message: ''
  }

  handleChangeTextField = (e, field) => {
    this.setState({ [field]: e.target.value });
  }

  handleSubmitForm = () => {
    if (!isEmail(this.state.email)) {
      return false;
    }
    this.props.sendContact(this.state);
  }

  buildFeedBackMessage = () => {
    const { content } = this.props;
    return (
      <div className={styles.feedbackMessage}>
        <div className={styles.feedbackText}>¡Hemos recibido tu mensaje!</div>
        <Submit
          className={cx(styles.btn, styles.primary)}
          name="home"
          value={content('Frontend.Contact.Buttons.home')}
          onClick={() => { redirectTo('/'); }}
          data-content-key="Frontend.Contact.Buttons.home"
        />
      </div>
    );
  }

  buildForm = () => {
    const { content } = this.props;
    const { name, email, message } = this.state;
    return (
      <Form className={styles.form}>
        <div className={styles.fieldContainer}>
          <Icon type="user" className={styles.fieldIcon} />
          <Text
            placeholder={content('Frontend.Contact.forms.fields.name')}
            className={styles.name}
            name="name"
            onChange={e => { this.handleChangeTextField(e, 'name'); }}
            value={name}
            contentKey="Frontend.Contact.forms.fields.name"
          />
        </div>
        <div className={styles.fieldContainer}>
          <Icon type="at" className={styles.fieldIcon} />
          <Text
            className={styles.email}
            name="email"
            placeholder={content('Frontend.Contact.forms.fields.email')}
            onChange={e => { this.handleChangeTextField(e, 'email'); }}
            value={email}
            contentKey="Frontend.Contact.forms.fields.email"
          />
        </div>

        <div className={styles.fieldContainer}>
          <Icon type="align-left" className={styles.fieldIcon} />
          <TextArea
            onChange={e => { this.handleChangeTextField(e, 'message'); }}
            id="text-area-id"
            name="text-area-name"
            placeholder={content('Frontend.Contact.forms.fields.message')}
            className={styles.message}
            value={message}
          />
        </div>

        <Submit
          className={cx(styles.btn, styles.primary)}
          name="register"
          value={content('Frontend.Contact.Buttons.send')}
          onClick={this.handleSubmitForm}
          data-content-key="Frontend.Contact.Buttons.send"
        />
      </Form>
    );
  }

  render() {
    let content;
    const { contact: { inserted } } = this.props;

    if (inserted) content = this.buildFeedBackMessage();
    else content = this.buildForm();

    return (
      <div className={styles.contact}>
        <div className={styles.wrapper}>
          {content}
        </div>
      </div>
    );
  }
}

export default Contact;

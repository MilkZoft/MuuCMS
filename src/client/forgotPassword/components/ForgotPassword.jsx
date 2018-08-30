// Dependencies
import React, { Component } from 'react';
import { func, object } from 'prop-types';

// Common Components
import Text from '@form/type/Text';
import Submit from '@form/type/Submit';
import Alert from '@ui/Alert';

// Utils
import { isEmail } from '@utils/is';
import { cx } from '@utils/frontend';
import { encrypt } from '@utils/security';
import { sanitize } from '@utils/string';

// Styles
import styles from './ForgotPassword.styl';

class ForgotPassword extends Component {
  static propTypes = {
    content: func.isRequired,
    checkForgotPasswordEmail: func.isRequired,
    resetPassword: func.isRequired,
    forgotPassword: object.isRequired
  }

  state = {
    email: '',
    newPassword: '',
    confirmPassword: '',
    validationError: false,
    errors: {
      newPassword: false,
      confirmPassword: false
    }
  }

  handleChangeTextField = (e, field) => {
    const FieldValue = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      [field]: FieldValue,
      errors: {
        ...prevState.errors,
        [field]: false
      }
    }));
  }

  handleSubmit = () => {
    if (isEmail(this.state.email)) {
      this.props.checkForgotPasswordEmail({ email: this.state.email });
    }
  }

  showAlert = () => {
    const { content } = this.props;
    return (
      <Alert
        className="forgotPassword"
        message={content('Frontend.ForgotPassword.error')}
        icon="times"
        type="danger"
        contentKey="Frontend.ForgotPassword.error"
      />
    );
  }

  updateErrorState = (field, value) => {
    this.setState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [field]: value
      }
    }));
  }

  handleNewPasswordSubmit = () => {
    const { newPassword, confirmPassword, email } = this.state;
    if (!newPassword.length) {
      this.updateErrorState('newPassword', true);
    } else if (!confirmPassword.length) {
      this.updateErrorState('confirmPassword', true);
    } else if (newPassword !== confirmPassword) {
      this.setState((prevState) => ({ ...prevState, validationError: true }));
    } else {
      this.setState((prevState) => ({ ...prevState, validationError: false }));

      this.props.resetPassword({
        email,
        newPassword: encrypt(sanitize(newPassword))
      });
    }
  }

  buildForgotPasswordForm = () => {
    const { content } = this.props;
    const { email } = this.state;
    return (
      <div className={styles.forgotPasswordForm}>
        <div className={styles.logoContainer}>
          <img className={styles.logoImage} src="/images/codejobs.png" alt="code jobs" />
          <span className={cx(styles.logoText, styles.logoTextBlue)}>CODE</span>
          <span className={styles.logoText}>JOBS</span>
        </div>
        <div className={styles.textContainer}>
          <p>{content('Frontend.ForgotPassword.forms.message')}</p>
        </div>
        <Text
          noWrapper
          placeholder={content('Frontend.Contact.forms.fields.email')}
          className={styles.input}
          name="email"
          onChange={e => { this.handleChangeTextField(e, 'email'); }}
          value={email}
          contentKey="Frontend.Contact.forms.fields.email"
        />
        <Submit
          className={cx(styles.btn, styles.primary)}
          value={content('Frontend.ForgotPassword.Buttons.send')}
          onClick={this.handleSubmit}
          data-content-key="Frontend.ForgotPassword.Buttons.send"
        />
      </div>
    );
  }

  buildNewPasswordForm = () => {
    const { content, forgotPassword } = this.props;
    const {
      newPassword,
      confirmPassword,
      validationError,
      errors: {
        newPassword: newPasswordErr,
        confirmPassword: confirmPasswordErr
      }
    } = this.state;

    if (forgotPassword.inserted) {
      return this.buildSuccessMessage();
    }

    return (
      <div className={styles.forgotPasswordForm}>
        <div className={styles.logoContainer}>
          <img className={styles.logoImage} src="/images/codejobs.png" alt="code jobs" />
          <span className={cx(styles.logoText, styles.logoTextBlue)}>CODE</span>
          <span className={styles.logoText}>JOBS</span>
        </div>
        {validationError ? this.showAlert() : ''}
        <div className={styles.textContainer}>
          <p>{content('Frontend.ForgotPassword.forms.message2')}</p>
        </div>
        <Text
          type="password"
          noWrapper
          placeholder={content('Frontend.ForgotPassword.forms.fields.newPassword')}
          className={cx(styles.input, newPasswordErr ? styles.required : '')}
          name="newPassword"
          onChange={e => { this.handleChangeTextField(e, 'newPassword'); }}
          value={newPassword}
          contentKey="Frontend.ForgotPassword.forms.fields.newPassword"
        />
        <Text
          type="password"
          noWrapper
          placeholder={content('Frontend.ForgotPassword.forms.fields.confirmPassword')}
          className={cx(styles.input, confirmPasswordErr ? styles.required : '')}
          name="confirmPassword"
          onChange={e => { this.handleChangeTextField(e, 'confirmPassword'); }}
          value={confirmPassword}
          contentKey="Frontend.ForgotPassword.forms.fields.confirmPassword"
        />
        <Submit
          className={cx(styles.btn, styles.primary)}
          value={content('Frontend.ForgotPassword.Buttons.resetPassword')}
          onClick={this.handleNewPasswordSubmit}
          data-content-key="Frontend.ForgotPassword.Buttons.resetPassword"
        />
      </div>
    );
  }

  buildSuccessMessage = () => {
    const { content } = this.props;
    return (
      <div className={styles.forgotPasswordForm}>
        <div className={styles.logoContainer}>
          <img className={styles.logoImage} src="/images/codejobs.png" alt="code jobs" />
          <span className={cx(styles.logoText, styles.logoTextBlue)}>CODE</span>
          <span className={styles.logoText}>JOBS</span>
        </div>
        <div className={styles.successText}>
          <p>{content('Frontend.ForgotPassword.forms.successMessage')}</p>
        </div>
      </div>
    );
  }

  buildContent = () => {
    const { forgotPassword } = this.props;
    if (forgotPassword.isValid) {
      return this.buildNewPasswordForm();
    } else {
      return this.buildForgotPasswordForm();
    }
  }

  render() {
    return (
      <div className={styles.forgotPassword}>
        <div className={styles.wrapper}>
          {this.buildContent()}
        </div>
      </div>
    );
  }
}

export default ForgotPassword;

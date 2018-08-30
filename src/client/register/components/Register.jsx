// Dependencies
import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';


// Utils
import { isEmail, isPassword } from '@utils/is';
import { cx, redirectTo } from '@utils/frontend';
import { encrypt } from '@utils/security';
import { sanitize } from '@utils/string';
import { getParamsFromUrl } from '@utils/url';

// Components
import Alert from '@ui/Alert';
import Logo from '@layout/header/Logo';
import CopyRight from '@layout/footer/CopyRight';
// import Icon from '@ui/Icon';
// import Link from '@ui/Link';
import Form from '@form';
import Email from '@form/type/Email';
import Text from '@form/type/Text';
import Input from '@form/type/Input';
import Password from '@form/type/Password';
import Submit from '@form/type/Submit';
import Helmet from '@ui/Helmet';

// Styles
import styles from './Register.styl';

class Register extends Component {
  static propTypes = {
    content: func.isRequired,
    doRegister: func.isRequired
  };

  constructor(props) {
    super(props);

    const user = getParamsFromUrl(true, 1);
    const email = getParamsFromUrl(true, 2);
    const network = getParamsFromUrl(true, 3);
    const networkId = getParamsFromUrl(true, 4);

    this.state = {
      username: user || '',
      password: '',
      email: email || '',
      network: network || '',
      networkId: networkId || '',
      errors: {
        username: '',
        password: '',
        email: ''
      },
      registerError: false,
      registerSuccess: false
    };
  }

  handleSubmit = () => {
    const { username, password, email, network = false, networkId = false } = this.state;
    const { doRegister } = this.props;

    const user = {
      username: sanitize(username),
      email: sanitize(email)
    };

    const isSocial = !!network && !!networkId;

    if (isSocial && username && isEmail(email)) {
      user.network = network;
      user.networkId = networkId;

      doRegister(user)
        .then(data => {
          const { payload: { response: { error = false, inserted = false } } } = data;

          if (inserted) {
            this.setState({ registerSuccess: true });
          } else if (error && error.includes('exists')) {
            this.setState({ registerError: true });
          }
        });
    } else if (!isSocial && username && isPassword(password) && isEmail(email)) {
      user.password = encrypt(sanitize(password));

      doRegister(user)
        .then(data => {
          const { payload: { response: { error = false, inserted = false } } } = data;

          if (inserted) {
            this.setState({ registerSuccess: true });
          } else if (error && error.includes('exists')) {
            this.setState({ registerError: true });
          }
        });
    } else {
      this.setState({
        errors: {
          username: !username,
          password: !isPassword(password),
          email: !isEmail(email)
        }
      });
    }
  }

  handleInputChanged = e => {
    const { target: { name } } = e;
    const { target: { value = '' } } = e;
    const newState = {};

    newState[name] = value;

    if (name) {
      this.setState(newState);
    }
  }

  handleRedirectToConnect = () => {
    redirectTo(`/users/connect/${this.state.username}/${this.state.email}/${this.state.networkId || 1}`);
  }

  render() {
    const { content } = this.props;

    const alert = (
      <Alert
        className="login"
        message={content('Frontend.Users.Register.error')}
        icon="times"
        type="danger"
        contentKey="Frontend.Users.Register.error"
      />
    );

    const password = (
      <Password
        autoFocus={!!this.state.username}
        className={cx(styles.password, this.state.errors.password ? styles.required : '')}
        name="password"
        placeholder={content('Frontend.Users.Password.placeholder')}
        onChange={this.handleInputChanged}
        value={this.state.password}
        contentKey="Frontend.Users.Password.placeholder"
      />
    );

    if (this.state.registerSuccess) {
      return (
        <div className={styles.register}>
          <Helmet title="Registro Completo" />

          <div className={styles.wrapper}>
            <Logo center refresh />

            <p className={styles.successMessage} data-content-key="Users.register.success">
              {content('Users.register.success')}
            </p>

            <div className={styles.success}>
              <Submit
                className={cx(styles.btn, styles.primary, styles.login)}
                name="login"
                value={content('Frontend.Users.Buttons.login')}
                onClick={this.handleRedirectToConnect}
                contentKey="Frontend.Users.Buttons.login"
              />
            </div>
          </div>

          <CopyRight className={styles.copyRight} />
        </div>
      );
    }

    return (
      <div className={styles.register}>
        <div className={styles.wrapper}>
          <Helmet title="Registro" />

          <Logo center refresh />

          {this.state.registerError && alert}

          <Form className={styles.form}>
            <Text
              autoFocus={!this.state.username}
              className={cx(styles.username, this.state.errors.username ? styles.required : '')}
              name="username"
              placeholder={content('Frontend.Users.Username.placeholder')}
              onChange={this.handleInputChanged}
              value={this.state.username}
              contentKey="Frontend.Users.Username.placeholder"
            />

            {!this.state.network && !this.state.networkId && password}


            <Email
              className={cx(styles.email, this.state.errors.password ? styles.required : '')}
              name="email"
              placeholder={content('Frontend.Users.Email.placeholder')}
              onChange={this.handleInputChanged}
              value={this.state.email}
              contentKey="Frontend.Users.Email.placeholder"
            />

            <Submit
              className={cx(styles.btn, styles.primary, styles.register)}
              name="register"
              value={content('Frontend.Users.Buttons.completeRegister')}
              onClick={this.handleSubmit}
              contentKey="Frontend.Users.Buttons.completeRegister"
            />

            {this.state.network && <Input type="hidden" name="network" value={this.state.network} />}
            {this.state.networkId && <Input type="hidden" name="networkId" value={this.state.networkId} />}
          </Form>

          {/* TODO: Reactivate once Twitter and Facebook login works again */}
          {/* <div className={styles.socialLogin}>
            <div className={styles.wrapper} data-content-key="Frontend.Users.Social.registerWith">
              {content('Frontend.Users.Social.registerWith')}

              <div className={styles.icons}>
                <Link
                  to="/auth/facebook"
                  refresh
                  external
                >
                  <Icon type="facebook" className={styles.facebook} />
                </Link>
                <Link
                  to="/auth/twitter"
                  refresh
                  external
                >
                  <Icon type="twitter" className={styles.twitter} />
                </Link>
              </div>
            </div>
          </div> */}
        </div>

        <CopyRight className={styles.copyRight} />
      </div>
    );
  }
}

export default connect(({ users }) => ({
  registrationStatus: users.registrationStatus
}))(Register);

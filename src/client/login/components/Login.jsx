// Dependencies
import React, { Component } from 'react';
import { func } from 'prop-types';

// Utils
import { isPassword } from '@utils/is';
import { cx, redirectTo } from '@utils/frontend';
import { encrypt } from '@utils/security';
import { sanitize } from '@utils/string';
import { getParamsFromUrl } from '@utils/url';
import { getInputChanged } from '@utils/form';
import { getCurrentLanguage } from '@utils/i18n';

// Components
import CopyRight from '@layout/footer/CopyRight';
import Logo from '@layout/header/Logo';
import Alert from '@ui/Alert';
// import Icon from '@ui/Icon';
import Link from '@ui/Link';
import Form from '@form';
import Text from '@form/type/Text';
import Password from '@form/type/Password';
import Submit from '@form/type/Submit';

// Styles
import styles from './Login.styl';

class Login extends Component {
  static propTypes = {
    content: func.isRequired,
    doLogin: func
  };

  constructor(props) {
    super(props);

    const user = getParamsFromUrl(true, 1);

    this.state = {
      username: user || '',
      password: '',
      errors: {
        username: '',
        password: ''
      },
      loginError: false
    };
  }

  handleInputChanged = e => {
    this.setState(getInputChanged(e));
  }

  handleSubmit = e => {
    const { target } = e;
    const { username = '', password } = this.state;
    const { doLogin } = this.props;
    if (target.name === 'register') {
      const language = getCurrentLanguage();
      redirectTo(`${language}/register/${username}`);
    } else if (username && password) {
      doLogin({
        username: sanitize(username),
        password: encrypt(sanitize(password))
      })
        .then(data => {
          const { payload: { error = false } } = data;

          if (error) {
            this.setState({ loginError: true });
          } else {
            redirectTo('/');
          }
        });
    } else {
      this.setState({
        errors: {
          username: !username,
          password: !isPassword(password)
        }
      });
    }
  }

  render() {
    const { content } = this.props;

    const alert = (
      <Alert
        className="login"
        message={content('Frontend.Users.Login.error')}
        icon="times"
        type="danger"
        contentKey="Frontend.Users.Login.error"
      />
    );

    return (
      <div className={styles.login}>
        <div className={styles.wrapper}>
          <Logo center refresh />

          {this.state.loginError && alert}

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

            <Password
              autoFocus={!!this.state.password}
              className={cx(styles.password, this.state.errors.password ? styles.required : '')}
              name="password"
              placeholder={content('Frontend.Users.Password.placeholder')}
              onChange={this.handleInputChanged}
              value={this.state.password}
              contentKey="Frontend.Users.Password.placeholder"
            />

            <Link
              to="/forgot-password"
              className={styles.forgotPassword}
              data-content-key="Frontend.Users.Password.forgotPassword"
            >
              {content('Frontend.Users.Password.forgotPassword')}
            </Link>

            <Submit
              className={cx(styles.btn, styles.dark, styles.login)}
              name="login"
              value={content('Frontend.Users.Buttons.login')}
              onClick={this.handleSubmit}
              data-content-key="Frontend.Users.Buttons.login"
            />

            <Submit
              className={cx(styles.btn, styles.primary, styles.register)}
              name="register"
              value={content('Frontend.Users.Buttons.register')}
              onClick={this.handleSubmit}
              data-content-key="Frontend.Users.Buttons.register"
            />
          </Form>

          {/* TODO: Reactivate once Twitter and Facebook login works again */}
          {/* <div className={styles.socialLogin}>
            <div className={styles.wrapper} data-content-key="Frontend.Users.Social.loginWith">
              {content('Frontend.Users.Social.loginWith')}

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

export default Login;

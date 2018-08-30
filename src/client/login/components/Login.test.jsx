// Dependencies
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

// Components
import CopyRight from '@layout/footer/CopyRight';
import Logo from '@layout/header/Logo';
// import Icon from '@ui/Icon';
// import Link from '@ui/Link';
import Form from '@form';
import Text from '@form/type/Text';
import Password from '@form/type/Password';
import Submit from '@form/type/Submit';

// Testable Component
import Login from './Login';

describe('Login Component', () => {
  const setup = props => {
    const mockProps = {
      content: k => k,
      doLogin: createSpy(),
      ...props
    };

    const login = mount(
      <MemoryRouter>
        <Login {...mockProps} />
      </MemoryRouter>
    );

    return {
      login,
      mockProps
    };
  };

  const { login } = setup();

  it('should render <Logo />', () => {
    expect(login.find(Logo).length).toEqual(1);
  });

  it('should render <Form />', () => {
    expect(login.find(Form).length).toEqual(1);
  });

  it('should render <Text />', () => {
    expect(login.find(Text).length).toEqual(1);
  });

  it('should render <Password />', () => {
    expect(login.find(Password).length).toEqual(1);
  });

  it('should render <Submit /> 2 times', () => {
    expect(login.find(Submit).length).toEqual(2);
  });

  // it('should render <Icon /> 2 times', () => {
  //   expect(login.find(Icon).length).toEqual(2);
  // });

  // it('should render <Link /> 4 times', () => {
  //   expect(login.find(Link).length).toEqual(4);
  // });

  it('should render <CopyRight />', () => {
    expect(login.find(CopyRight).length).toEqual(1);
  });

  // it('should have the content key Frontend.Users.Social.loginWith in .socialLogin', () => {
  //   expect(
  //     login.find('.socialLogin .wrapper').text()
  //   ).toEqual('Frontend.Users.Social.loginWith');
  // });
});

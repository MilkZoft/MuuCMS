// Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Components
import Icon from '@ui/Icon';

// Testable Component
import Alert from './Alert';

describe('Alert Component', () => {
  it('should render an alert with message, icon and type danger', () => {
    const alert = shallow(<Alert message="This is an alert" icon="times" type="danger" />);

    expect(alert.find('.alert.full.danger').length).toEqual(1);
    expect(alert.find(Icon).length).toEqual(1);
    expect(alert.text()).toEqual('<Icon /> This is an alert');
  });

  it('should render an alert with message and type warning (without Icon)', () => {
    const alert = shallow(<Alert message="This is an alert without icon" type="warning" />);

    expect(alert.find('.alert.full.warning').length).toEqual(1);
    expect(alert.find(Icon).length).toEqual(0);
    expect(alert.text()).toEqual('This is an alert without icon');
  });
});

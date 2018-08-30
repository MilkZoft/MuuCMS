// Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Testable Component
import Icon from './Icon';

describe('Icon Component', () => {
  it('should have .fa & .fa-times classNames', () => {
    const icon = shallow(<Icon type="times" />);

    expect(icon.find('.fa.fa-times').length).toEqual(1);
  });

  it('should have .fa, .fa-times & other classNames', () => {
    const icon = shallow(<Icon type="times" className="other" />);

    expect(icon.find('.fa.fa-times.other').length).toEqual(1);
  });
});

// Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Testable Component
import Retina from './Retina';

describe('Retina Component', () => {
  const retina = shallow(<Retina src="/images/icons/react.png" />);

  it('should have alt attribute with the filename', () => {
    expect(retina.find({ alt: 'react.png' }).length).toEqual(1);
  });

  it('should have src attribute', () => {
    expect(retina.find({ src: '/images/icons/react.png' }).length).toEqual(1);
  });

  it('should have srcSet attribute', () => {
    expect(retina.find({ srcSet: '/images/icons/react.png 1x, /images/icons/react_2x.png 2x' }).length).toEqual(1);
  });
});

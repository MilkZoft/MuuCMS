// Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Testable Component
import Excerpt from './Excerpt';

describe('Excerpt Component', () => {
  it('should render the excerpt with image', () => {
    const excerpt = shallow(<Excerpt src="/images/react.png" />);

    expect(excerpt.html()).toEqual('<p><img class="image" alt="react.png" src="/images/react.png"/></p>');
  });

  it('should render the excerpt with content', () => {
    const excerpt = shallow(<Excerpt content="Foo" />);

    expect(excerpt.html()).toEqual('<p>Foo</p>');
  });

  it('should render the excerpt with image and content', () => {
    const excerpt = shallow(<Excerpt src="/images/react.png" content="Foo" />);

    expect(excerpt.html()).toEqual('<div><p><img class="image" alt="react.png" src="/images/react.png"/></p><p>Foo</p></div>');
  });
});

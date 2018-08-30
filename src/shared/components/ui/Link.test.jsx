// Dependencies
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

// Testable Component
import Link from './Link';

describe('Link Component', () => {
  it('should render a link with href="/en/foo" and text="Foo"', () => {
    const link = mount(
      <MemoryRouter>
        <Link to="/foo">Foo</Link>
      </MemoryRouter>
    );

    expect(link.find({ href: '/en/foo' }).length).toEqual(1);
    expect(link.text()).toEqual('Foo');
  });

  it('should render a link with href="https://codejobs.biz" and text="Codejobs"', () => {
    const link = mount(
      <MemoryRouter>
        <Link to="https://codejobs.biz">Codejobs</Link>
      </MemoryRouter>
    );

    expect(link.find({ href: 'https://codejobs.biz' }).length).toEqual(1);
    expect(link.text()).toEqual('Codejobs');
  });

  it('should render an external link with href="/bar" and text="Bar" and target="_blank"', () => {
    const link = mount(
      <MemoryRouter>
        <Link to="/bar" target="_blank" external>Bar</Link>
      </MemoryRouter>
    );

    expect(link.find({ href: '/bar', target: '_blank' }).length).toEqual(1);
    expect(link.text()).toEqual('Bar');
  });
});

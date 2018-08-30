// Dependencies
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

// Testable Component
import Pagination from './Pagination';

describe('Pagination Component', () => {
  it('should render the pagination', () => {
    const pagination = mount(
      <MemoryRouter>
        <Pagination page={2} rows={100} url="blog/page/" />
      </MemoryRouter>
    );

    expect(pagination.find('.pagination').length).toEqual(1);
    expect(pagination.find('.pagination ul li').length).toEqual(12);
    expect(pagination.find('.pagination ul li a.previous').length).toEqual(1);
    expect(pagination.find('.pagination ul li a.active').length).toEqual(1);
    expect(pagination.find('.pagination ul li a.next').length).toEqual(1);
    expect(pagination.find({ href: '/en/blog/page/1/' }).length).toEqual(2);
    expect(pagination.find({ href: '/en/blog/page/3/' }).length).toEqual(2);
    expect(pagination.find({ href: '/en/blog/page/4/' }).length).toEqual(1);
    expect(pagination.find({ href: '/en/blog/page/5/' }).length).toEqual(1);
    expect(pagination.find({ href: '/en/blog/page/6/' }).length).toEqual(1);
    expect(pagination.find({ href: '/en/blog/page/7/' }).length).toEqual(1);
    expect(pagination.find({ href: '/en/blog/page/8/' }).length).toEqual(1);
    expect(pagination.find({ href: '/en/blog/page/9/' }).length).toEqual(1);
  });
});

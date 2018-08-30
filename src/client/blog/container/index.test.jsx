// Dependencies
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

// Actions
import { fetchPosts } from '../actions';

// Testable Container
import BlogContainer from './index';

// Mocking Initial State
const mockInitialState = {
  blog: {
    apiInfo: {},
    posts: [],
    singlePost: [],
  },
  content: {
    content: {}
  },
  req: {
    req: {}
  }
};

// Configuring Mock Store
const mockStore = configureStore()(mockInitialState);

// Mocking the Actions
jest.mock('../actions', () => ({
  fetchPosts: jest.fn().mockReturnValue({ type: 'mock-FETCH_POSTS_SUCCESS' }),
}));

describe('Blog Container', () => {
  let mockParams;
  let blogContainer;

  beforeEach(() => {
    fetchPosts.mockClear();

    mockParams = {};
    mockStore.clearActions();
    blogContainer = shallow(<BlogContainer {...mockParams} store={mockStore} />);
  });

  it('should map fetchPosts', () => {
    blogContainer.props().fetchPosts();

    const actions = mockStore.getActions();

    expect(actions).toEqual([{ type: 'mock-FETCH_POSTS_SUCCESS' }]);
  });
});

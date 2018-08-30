// Dependencies
import React from 'react';

// Actions
import { fetchPosts } from './actions';

// Main Container
import Container from './container';

// Main Component
const Main = props => <Container {...props} />;

// Initial Action
Main.initialAction = (fetchingFrom, req = {}) => fetchPosts(fetchingFrom, req);

export default Main;

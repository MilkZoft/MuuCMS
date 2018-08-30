// Dependencies
import React from 'react';

// Actions
import { fetchPage } from './actions';

// Main Container
import Container from './container';

// Main Component
const Main = props => <Container {...props} />;

// Initial Action
Main.initialAction = (fetchingFrom, req = {}) => fetchPage(fetchingFrom, req);

export default Main;

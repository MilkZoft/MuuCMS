// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// Actions
import { getUserData } from '@client/users/actions';

export default function baseComponent(Wrapper) {
  const BaseComponent = props => <Wrapper {...props} />;

  return connect(({ content, device, users }) => ({
    connectedUser: users.connectedUser,
    content: content.content,
    isConnected: users.isConnected,
    isGod: users.isGod,
    isMobile: device.isMobile
  }), dispatch => ({
    getUserData: dispatch(getUserData())
  }))(BaseComponent);
}

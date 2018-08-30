// Dependencies
import { combineReducers } from 'redux';

// App Reducers
import users from '@client/users/reducer';
import contact from '@client/contact/reducer';
import comments from '@client/comments/reducer';
import forgotPassword from '@client/forgotPassword/reducer';

// Default Reducers
import content from './contentReducer';
import device from './deviceReducer';
import req from './reqReducer';

export default (appName, reducer) => {
  const reducers = {
    content,
    device,
    req,
    users,
    contact,
    comments,
    forgotPassword
  };

  if (appName && reducer) {
    reducers[appName] = reducer;
  }

  const rootReducer = combineReducers(reducers);

  return rootReducer;
};

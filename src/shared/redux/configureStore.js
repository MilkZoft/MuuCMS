// Dependencies
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Root Reducer
import rootReducer from '../reducers';

export default function configureStore({ initialState, appName, reducer }) {
  const middleware = [
    thunk
  ];

  return createStore(
    rootReducer(appName, reducer),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}

// Dependencies
import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { bool, object, string } from 'prop-types';

const App = ({ server, location, context, routes }) => {
  // Client Router
  let router = (
    <BrowserRouter>
      {routes.client}
    </BrowserRouter>
  );

  // Server Router
  if (server) {
    router = (
      <StaticRouter location={location} context={context}>
        {routes.client}
      </StaticRouter>
    );
  }

  return (
    <div className="App">
      {router}
    </div>
  );
};

App.propTypes = {
  server: bool,
  location: string,
  context: object,
  routes: object.isRequired
};

export default App;

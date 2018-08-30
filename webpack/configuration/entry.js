// Configuration
import { $app, $isLocal } from '@configuration';

// Allowed Apps
const allowedApps = $app().allowed;

export default type => {
  if (type === 'server') {
    return './render/serverRender.jsx';
  }

  const entry = {};

  const reactHotLoaderEntries = [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&reload=true',
    'react-hot-loader/patch'
  ];

  Object.keys(allowedApps).forEach(app => {
    if (allowedApps[app].frontend) {
      if ($isLocal()) {
        entry[app] = [...reactHotLoaderEntries];
        entry[app].push(`./${app}/render/index.js`);
      } else {
        entry[app] = [`./${app}/render/index.js`];
      }
    }
  });


  return entry;
};

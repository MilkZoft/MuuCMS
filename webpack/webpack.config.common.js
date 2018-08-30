// Environment
import { $isLocal } from '@configuration';

// Configuration
import { rules, extensions, modules } from './configuration';

export default type => ({
  mode: $isLocal() ? 'development' : 'production',
  module: {
    rules: rules(type)
  },
  resolve: {
    extensions: extensions(),
    modules: modules()
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
});

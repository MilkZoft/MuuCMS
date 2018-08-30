// Dependencies
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Configuration
import { $isLocal } from '@configuration';

export default type => {
  const rules = [
    {
      test: /\.(jsx|js)$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }
  ];

  if (!$isLocal() || type === 'server') {
    rules.push({
      test: /\.styl/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
          'stylus-loader'
        ]
      })
    });
  } else {
    rules.push(
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
          'stylus-loader'
        ]
      }
    );
  }

  return rules;
};

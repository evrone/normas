const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/js/index.js',
    normasWithTurbolinks: './src/js/normasWithTurbolinks.js',
    normasMutations: './src/js/mixins/mutations.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js'],
  },

  module: {
    // strictExportPresence: true,
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    }],
  },

  plugins: [
    new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()
  ]
};

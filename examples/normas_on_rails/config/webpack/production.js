const environment = require('./environment');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// environment.plugins.append('BundleAnalyzer', new BundleAnalyzerPlugin());

module.exports = environment.toWebpackConfig();

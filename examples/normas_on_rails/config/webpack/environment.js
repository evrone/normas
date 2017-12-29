const { environment } = require('@rails/webpacker');

// User ES-next source from Normas for development
const babelLoader = environment.loaders.get('babel');
babelLoader.exclude = /node_modules(?!\/normas)/;

// Globalize jQuery
const oldToWebpackConfig = environment.toWebpackConfig;
environment.toWebpackConfig = () => {
  const config = oldToWebpackConfig.call(environment);
  config.resolve.alias = {
    jquery: 'jquery/src/jquery',
  };
  return config;
};

module.exports = environment;

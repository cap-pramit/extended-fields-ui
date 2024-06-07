/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const port = require('../../server/port');
const pathConfig = require('../../app/config/path');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const appConfig = require('../../app-config');
const sanitizeAppName = require('./utils/sanitizeAppName')

const sanitizedMFEChunkName = `${sanitizeAppName(appConfig.appName)}_MFE`;

module.exports = require('./webpack.base.babel')({
  mode: 'development',

  // Add hot reloading in development
  entry: {
    main: [
      require.resolve('react-app-polyfill/ie11'),
      'webpack-hot-middleware/client?reload=true',
      path.join(process.cwd(), 'app/app.js'), // Start with js/app.js
    ],
    [sanitizedMFEChunkName]: path.join(process.cwd(), 'app/entry.js')
  },

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: `http://localhost:${port}${pathConfig.prefixPath}`,
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'async',
          reuseExistingChunk: true,
        },
        common: {
          name: `chunk-common`,
          minChunks: 3,
          enforce: true,
          priority: -20,
          chunks: 'async',
          reuseExistingChunk: true,
          test(module) {
            if (
              module.type === 'provide-module' ||
              module.type === 'consume-shared-module' ||
              module.type === 'remote-module'
            ) {
              return false;
            }
            return true;
          },
        },
      },
    },
  },

  // Add development plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      template: 'app/index.html',
      excludeChunks: [sanitizedMFEChunkName],
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
    // new ReactRefreshWebpackPlugin(),
    new ProgressBarPlugin({
      format: `  build [:bar] ${chalk.green.bold(
        ':percent',
      )} (:elapsed seconds)`,
      clear: false,
      complete: chalk.bgGreen(' '),
      incomplete: chalk.bgWhite(' '),
    })
  ],

  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'cheap-module-source-map',

  performance: {
    hints: false,
  },
});

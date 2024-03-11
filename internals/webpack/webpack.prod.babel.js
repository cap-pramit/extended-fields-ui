// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin; //eslint-disable-line
const CompressionPlugin = require('brotli-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const appConfig = require('../../app-config');

const useSourceMaps = appConfig.useSourceMaps;
const sanitizeAppName =  require('./utils/sanitizeAppName');
const sanitizedMFEChunkName = `${sanitizeAppName(appConfig.appName)}_MFE`;

const bundleAnalyzerEnabled = process.env.ANALYZE === 'true';

bundleAnalyzer = [];

// enable when build steps analysis is required to see which steps n plugins take more time
// const smp = new SpeedMeasurePlugin({
//   disable: !bundleAnalyzerEnabled,
//   // disable: false,
//   outputFormat: 'human', // detailed logs
//   granularLoaderData: false,
// });

if (bundleAnalyzerEnabled) {
  bundleAnalyzer.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'parsed',
      openAnalyzer: false,
      generateStatsFile: true,
      statsOptions: {
        source: false,
      },
      logLevel: 'info',
    }),
  );
}

module.exports = 
  require('./webpack.base.babel')({
    mode: 'production',
    // In production, we skip all hot-reloading stuff
    entry: {
      main: [path.join(process.cwd(), 'app/app.js')],
      [sanitizedMFEChunkName]: [path.join(process.cwd(), 'app/entry.js')],
    },
    devtool: useSourceMaps ? 'source-map' : false,

    // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
    },
    stats: {
      warnings: false,
      children: false,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2015', // Syntax to compile to (see options below for possible values)
        }),
      ],
      nodeEnv: 'production',
      sideEffects: true,
      concatenateModules: true,
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
      // runtimeChunk: true,
    },
    plugins: [
      new webpack.optimize.AggressiveMergingPlugin(),
      ...bundleAnalyzer,

      // Minify and optimize the index.html
      new HtmlWebpackPlugin({
        template: 'app/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        inject: true,
        favicon: 'app/favicon.ico',
      }),

      // new CompressionPlugin({
      //   asset: '[path].br[query]',
      //   test: /\.(js|css|html)$/,
      //   threshold: 10240,
      //   minRatio: 0.8,
      // }),
    ],

    performance: {
      assetFilter: assetFilename =>
        !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename), //eslint-disable-line
    },
  });


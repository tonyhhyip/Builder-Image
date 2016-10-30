'use strict';

const UglifyPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');

module.exports = {
  plugins: [
    new UglifyPlugin({minimize: true}),
    new OccurenceOrderPlugin(),
    new DedupePlugin()
  ],
  external: {

  },
  devtool: 'source-map',
  entry: {
    app: './assets/js/app'
  },
  output: {
    path: `${__dirname}/public/js`,
    publicPath: '/js',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    fallback: ['node_modules']
  },
  resolveLoader: {
    fallback: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  }
};

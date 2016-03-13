const path = require('path');
const webpack = require('webpack');
const entries = ['./index'];
if (process.NODE_ENV !== 'production') {
  entries.unshift('webpack-hot-middleware/client');
}

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    alias: { 'react-responsive-tabs': path.join(__dirname, '..', 'src', 'index') },
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
    ],
  },
};

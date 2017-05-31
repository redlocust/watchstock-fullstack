var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './client/app.jsx'
  ],

  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },

  resolve: {
    alias: {
      Main: path.resolve(__dirname, './client/components/Main.jsx'),
    }
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  devtool: 'source-map'
};
let path = require('path');
let webpack = require('webpack');

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
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader' },
      { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
    ]
  },

  devtool: 'source-map'
};
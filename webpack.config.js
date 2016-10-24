'use strict';
let webpack = require('webpack');
let path = require('path');
let precss = require('precss');
let autoprefixer = require('autoprefixer');

let BUILD_DIR = path.resolve(__dirname, 'public');
let APP_DIR = path.resolve(__dirname, 'src/js');

module.exports = {
  entry: {
    app: APP_DIR + '/main.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-addons-css-transition-group',
      'axios'
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: APP_DIR,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function () {
      return [precss, autoprefixer];
  },
  devServer: {
    inline: true,
    contentBase: './public'
  }
};

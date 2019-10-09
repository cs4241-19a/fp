const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    main: ['@babel/polyfill', './src/javascript/index.js'],
    deletion: ['@babel/polyfill', './src/javascript/deletion.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

module.exports = config;

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/App.jsx',
  output: {
    path: path.resolve(__dirname, 'client'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
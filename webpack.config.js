var path = require('path');
var APP_DIR = path.resolve(__dirname, 'src/app/');
var BUILD_DIR = path.resolve(__dirname, 'src/public');

module.exports = {
  entry: './src/app/entry.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jsx?/, include: APP_DIR, loader: 'babel' }
    ]
  },
  debug: true
}

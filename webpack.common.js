const path = require('path');

module.exports = {
  entry: {
    app: './js/trending.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/trending.js',
  },
};

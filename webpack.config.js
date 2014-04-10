var srcRoot = './src/';
console.log('react', __dirname + '/lib/react/react.js');
module.exports = {
  cache: true,
  entry: srcRoot + "app.js",

  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {},
  externals: {
    react: 'react'
  },
  resolve: {
    alias: {
      react: __dirname + '/src/js/app/lib/react/react.js',
      root: __dirname + '/src/js/app/build'
    }
  }
};
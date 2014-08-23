var srcRoot = './src/app/';
module.exports = {
  cache: true,
  watch: true,
  entry: srcRoot + "index.js",

  output: {
    path: __dirname + '/public',
    filename: 'js/bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx" }
    ]
  },
  
  resolve: {
    alias: {
      root: __dirname + '/src/app'
    },
    modulesDirectories: ['bower_components', 'node_modules'],
    extensions: [".jsx", '', ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"]
  }
};

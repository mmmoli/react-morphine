var webpack = require('webpack');
var path = require('path');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';;
var minify = process.env.MINIFY || false;

var eslintLoader = {
  test: /\.js$/,
  loaders: ['eslint'],
  include: [path.resolve('./source'), path.resolve('./example')]
};

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true
});


module.exports = {
  devtool: 'sourcemap',

  entry: {
    lib:'./source/index.js',
    example:'./example/index.js'
  },

  output: {
    filename: minify ? 'index.min.js' : 'index.js',
    path: path.resolve('./build')
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + env + '"'
      }
    })
  ].concat(minify ? [uglifyPlugin] : []),

  module: {
    preLoaders: env === 'development' ? [
      eslintLoader
    ] : [],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?plugins=object-assign',
        include: [path.resolve('./source'), path.resolve('./example')]
      },
      {
        test: /\.css$/,
        loader: 'style!css',
        include: [path.resolve('./source'), path.resolve('./example')]
      }
    ]
  },

  resolve: {
    extensions: ['', '.js']
  },

  stats: {
    colors: true
  },

  eslint: {
    configFile: './.eslintrc'
  }
};

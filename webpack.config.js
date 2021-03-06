var webpack = require('webpack');
var path = require('path');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var eslintLoader = {
  test: /\.js$/,
  loaders: ['eslint'],
  include: [path.resolve('./source'), path.resolve('./example')]
};

module.exports = {
  devtool: 'eval-source-map',

  entry: {
    example:'./example/index.js'
  },

  output: {
    filename: 'bundle.js',
    publicPath: '/example/',
    path: path.resolve('./example')
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + env + '"'
      }
    })
  ],

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
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'babel-core', 'browser.min.js')
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  stats: {
    colors: true
  },

  eslint: {
    configFile: './.eslintrc'
  }
};

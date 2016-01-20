var webpack = require('webpack');
var path = require('path');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';
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
    lib:'./source/index.js'
  },

  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }],

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    filename: minify ? 'react-morphine.min.js' : 'react-morphine.js',
    sourceMapFilename: 'react-morphine.map',
    library: 'ReactMorphine',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + env + '"'
      }
    })
  ].concat(minify ? [uglifyPlugin] : []),

  module: {
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

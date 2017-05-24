var entry = require.resolve('./src/index.js');

var path = require('path');
var webpack = require('webpack');
var vtkLoaders = require('vtk.js/Utilities/config/dependency.js').webpack.v1.loaders;
var pluginList = [];

if (process.env.NODE_ENV === 'production') {
  console.log('==> Production build');
  pluginList.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }));
}

module.exports = {
  plugins: pluginList,
  entry: entry,
  output: {
    path: './dist',
    filename: 'itkVtkImageViewer.js',
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    }],
    loaders: [
      { test: entry, loader: 'expose?itkVtkImageViewer' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.mcss$/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader' },
      { test: /\.js$/, loader: 'babel-loader?presets[]=es2015' },
    ].concat(vtkLoaders),
  },
  postcss: [
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
  ],
  eslint: {
    configFile: '.eslintrc.js',
  },
  resolve: {
    alias: {
    },
  },
};

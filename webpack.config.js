const webpack = require('webpack');
const path = require('path');

const entry = path.join(__dirname, './src/index.js');
const sourcePath = path.join(__dirname, './source');
const outputPath = path.join(__dirname, './dist');

const vtkDependencyRules = require('vtk.js/Utilities/config/dependency.js');
const commonRules = require('vtk.js/Utilities/config/rules-examples.js');

module.exports = {
  node: {
    fs: 'empty',
  },
  entry,
  output: {
    path: outputPath,
    filename: 'itkVtkImageViewer.js',
  },
  module: {
    rules: [
      { test: entry, loader: 'expose-loader?itkVtkImageViewer' },
      { test: /\.js$/, loader: 'babel-loader' },
    ].concat(vtkDependencyRules.webpack.v2),
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },
};

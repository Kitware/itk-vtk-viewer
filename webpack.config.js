const webpack = require('webpack');
const path = require('path');

const entry = path.join(__dirname, './src/index.js');
const sourcePath = path.join(__dirname, './source');
const outputPath = path.join(__dirname, './dist');

const vtkRules = require('vtk.js/Utilities/config/rules-vtk.js');
const linterRules = require('vtk.js/Utilities/config/rules-linter.js');
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
      { test: /\.js$/, loader: 'babel-loader', options: { presets: ['es2015'] } },
    ].concat(vtkRules, linterRules, commonRules),
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },
  externals: {
    config: '{}',
  },
};

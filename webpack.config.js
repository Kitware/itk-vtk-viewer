const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const entry = path.join(__dirname, './src/index.js');
const sourcePath = path.join(__dirname, './source');
const outputPath = path.join(__dirname, './dist');

const vtkRules = require('vtk.js/Utilities/config/rules-vtk.js');


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
      { test: /\.(png|jpg)$/, use: 'url-loader?limit=81920' },
    ].concat(vtkRules),
  },
  plugins: [
    new CopyPlugin([
      {
      from: path.join(__dirname, 'node_modules', 'workbox-sw',
        'build', 'importScripts', 'workbox-sw.prod.*.js'),
      flatten: true,
      to: path.join(__dirname, 'dist'),
      },
      {
      from: path.join(__dirname, 'node_modules', 'itk'),
      to: path.join(__dirname, 'dist', 'itk'),
      },
    ]),
    // workbox plugin should be last plugin
    new WorkboxPlugin({
      globDirectory: outputPath,
      maximumFileSizeToCacheInBytes: 5000000,
      globPatterns: ['*.{html,jpg,js,png,svg}'],
      globIgnores: [
        'serviceWorker.js',
      ],
    swSrc: path.join('src', 'serviceWorker.js'),
    swDest: path.join('dist', 'serviceWorker.js'),
    }),
  ],
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },
};

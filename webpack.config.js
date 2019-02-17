const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebPackBar = require('webpackbar');

const entry = path.join(__dirname, './src/index.js');
const sourcePath = path.join(__dirname, './source');
const outputPath = path.join(__dirname, './dist');

const vtkRules = require('vtk.js/Utilities/config/dependency.js').webpack.core.rules;
const cssRules = require('vtk.js/Utilities/config/dependency.js').webpack.css.rules;

const devServer = {
  noInfo: true,
  stats: 'minimal'
}

module.exports = {
  node: {
    fs: 'empty',
  },
  entry,
  output: {
    path: outputPath,
    filename: 'itkVtkViewer.js',
  },
  module: {
    rules: [
      { test: entry, loader: 'expose-loader?itkVtkViewer' },
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.(png|jpg)$/, use: 'url-loader?limit=81920' },
      { test: /\.svg$/, use: [{ loader: 'raw-loader' }], },
    ].concat(vtkRules, cssRules),
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
      from: path.join(__dirname, 'node_modules', 'itk', 'WebWorkers'),
      to: path.join(__dirname, 'dist', 'itk', 'WebWorkers'),
      },
      {
      from: path.join(__dirname, 'node_modules', 'itk', 'ImageIOs'),
      to: path.join(__dirname, 'dist', 'itk', 'ImageIOs'),
      },
      {
      from: path.join(__dirname, 'node_modules', 'itk', 'MeshIOs'),
      to: path.join(__dirname, 'dist', 'itk', 'MeshIOs'),
      },
      {
      from: path.join(__dirname, 'node_modules', 'itk', 'Pipelines'),
      to: path.join(__dirname, 'dist', 'itk', 'Pipelines'),
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
    new WebPackBar(),
  ],
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },
  performance: {
      maxAssetSize: 15000000,
      maxEntrypointSize: 15000000
  },
  devServer,
};

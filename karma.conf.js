/* eslint-disable global-require */
/* eslint-disable react/require-extension */
var path = require('path')

const testsRules = require(path.join(__dirname, './node_modules/vtk.js/Utilities/config/rules-tests.js'))

var webpack = require('webpack')

var sourcePath = path.join(__dirname, './src');

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test';

module.exports = function init(config) {
  config.set({
    plugins: [
      require('karma-webpack'),
      require('karma-tap'),
      require('karma-chrome-launcher'),
      require('karma-tap-pretty-reporter'),
    ],

    basePath: '',
    frameworks: ['tap'],
    files: [
      './node_modules/babel-polyfill/dist/polyfill.min.js',
      './test/tests.js',
      { pattern: './node_modules/itk/ImageIOs/**', watched: true, served: true, included: false },
      { pattern: './node_modules/itk/WebWorkers/**', watched: true, served: true, included: false },
      //{ pattern: 'Data/**', watched: false, served: true, included: false },
    ],

    preprocessors: {
      './test/tests.js': ['webpack'],
    },

    webpack: {
      node: {
        fs: 'empty',
      },
      module: {
        rules: [].concat(testsRules),
      },
      resolve: {
        modules: [
          path.resolve(__dirname, 'node_modules'),
          sourcePath,
        ],
        alias: {
          './itkConfig.js': path.resolve(__dirname, 'test', 'itkConfigBrowserTest.js'),
        },
      },
      plugins: [
        new webpack.DefinePlugin({
          __BASE_PATH__: "'/base'",
        }),
      ],
    },

    webpackMiddleware: {
      noInfo: true,
    },

    reporters: [
      'tap-pretty',
    ],

    client: {
      useIframe: true,
    },

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    // browserNoActivityTimeout: 600000,
    // browserDisconnectTimeout: 600000,

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
  });
};

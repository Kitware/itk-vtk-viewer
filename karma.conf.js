/* eslint-disable global-require */
const path = require('path')

const vtkRules = require('vtk.js/Utilities/config/rules-vtk.js')

var webpack = require('webpack')

var sourcePath = path.join(__dirname, './src')

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test'

process.env.CHROME_BIN = require('puppeteer').executablePath()

const fallback = {
  path: false,
  url: false,
  module: false,
  fs: false,
  stream: require.resolve('stream-browserify'),
  crypto: false,
}

const itkConfigTest = path.resolve(__dirname, 'test', 'itkConfigBrowserTest.js')

module.exports = function init(config) {
  config.set({
    plugins: [
      require('karma-webpack'),
      require('karma-tap'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-tap-pretty-reporter'),
      require('karma-junit-reporter'),
    ],

    basePath: '',
    frameworks: ['tap', 'webpack'],
    files: [
      './test/tests.js',
      {
        pattern: './dist/itk/image-io/**',
        watched: true,
        served: true,
        included: false,
      },
      {
        pattern: './dist/itk/mesh-io/**',
        watched: true,
        served: true,
        included: false,
      },
      {
        pattern: './dist/itk/web-workers/**',
        watched: true,
        served: true,
        included: false,
      },
      {
        pattern: './dist/itk/pipeline/**',
        watched: true,
        served: true,
        included: false,
      },
      {
        pattern: './test/data/**',
        watched: false,
        served: true,
        included: false,
      },
      {
        pattern: './test/data/**/.*',
        watched: false,
        served: true,
        included: false,
      },
      {
        pattern: './dist/index.html',
        watched: true,
        served: true,
        included: false,
      },
      {
        pattern: './dist/itkVtkViewer.js',
        watched: true,
        served: true,
        included: false,
      },
      {
        pattern: './src/UI/reference-ui/dist/referenceUIMachineOptions.js',
        watched: true,
        served: true,
        included: false,
      },
      {
        pattern: './src/UI/reference-ui/**/**',
        watched: true,
        served: true,
        included: false,
      },
      {
        pattern: './test/testUINoPlaneSlidersBundle.js',
        watched: true,
        served: true,
        included: false,
      },
    ],

    preprocessors: {
      './test/tests.js': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'eval-source-map',
      module: {
        rules: [{ test: /\.(png|jpg)$/, type: 'asset/inline' }].concat(
          vtkRules
        ),
      },
      resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
        alias: {
          '../itkConfig.js': itkConfigTest,
          '../../itkConfig.js': itkConfigTest,
          stream: 'stream-browserify',
          buffer: 'buffer',
        },
        fallback,
      },
      plugins: [
        new webpack.DefinePlugin({
          __BASE_PATH__: "'/base'",
        }),
        new webpack.ProvidePlugin({ process: ['process/browser'] }),
      ],
    },

    webpackMiddleware: {
      noInfo: true,
    },

    reporters: ['tap-pretty', 'junit'],

    tapReporter: {
      outputFile: 'test/output.html',
      separator:
        '\n=========================================================\n=========================================================\n',
    },

    junitReporter: {
      outputDir: 'test',
    },

    client: {
      useIframe: true,
      args: config.dockered ? ['--dockered'] : [],
    },

    // browserNoActivityTimeout: 600000,
    browserDisconnectTimeout: 5000,

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome_without_sandbox'],
    singleRun: true,
    customLaunchers: {
      Chrome_without_sandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
  })
}

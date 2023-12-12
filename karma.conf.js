/* eslint-disable global-require */
const path = require('path')
const os = require('os')

const vtkRules = require('vtk.js/Utilities/config/dependency.js').webpack.core
  .rules
const cssRules = require('vtk.js/Utilities/config/dependency.js').webpack.css
  .rules

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

// should be same as in webpack.config.js
const moduleConfigRules = [
  { test: /\.js$/, loader: 'babel-loader', dependency: { not: ['url'] } },
  {
    test: /\.worker.js$/,
    exclude: /node_modules/, // Skip itk-wasm worker in node modules.  Copy plugin pulls prebuild itk-wasm-pipeline.worker.js
    use: [{ loader: 'worker-loader', options: { inline: 'no-fallback' } }],
  },
  {
    test: /\.(png|jpg)$/,
    type: 'asset',
    parser: { dataUrlCondition: { maxSize: 128 * 1024 } },
  }, // 128kb
  { test: /\.svg$/, type: 'asset/source' },
].concat(vtkRules, cssRules)

const entry = path.join(__dirname, './src/index.js')

// fixes 404 errors getting worker bundles https://github.com/ryanclark/karma-webpack/issues/498#issuecomment-790040818
const output = {
  path:
    path.join(os.tmpdir(), '_karma_webpack_') +
    Math.floor(Math.random() * 1000000),
}

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
        pattern: './dist/**',
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
      {
        pattern: `${output.path}/**/*`,
        watched: false,
        included: false,
      },
    ],

    preprocessors: {
      './test/tests.js': ['webpack'],
    },

    webpack: {
      output,
      mode: 'development',
      devtool: 'eval-source-map',
      module: {
        rules: moduleConfigRules.concat([
          {
            test: entry,
            loader: 'expose-loader',
            options: { exposes: 'itkVtkViewer' },
          },
        ]),
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

    browserDisconnectTimeout: 60000,
    browserNoActivityTimeout: 60000,

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

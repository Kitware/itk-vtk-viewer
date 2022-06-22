const webpack = require('webpack')
const path = require('path')

const CopyPlugin = require('copy-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const WebPackBar = require('webpackbar')

const entry = path.join(__dirname, './src/index.js')

const vtkRules = require('vtk.js/Utilities/config/dependency.js').webpack.core
  .rules
const cssRules = require('vtk.js/Utilities/config/dependency.js').webpack.css
  .rules

const packageJSON = require('./package.json')
const cdnPath = 'https://cdn.jsdelivr.net/npm/'
const itkConfigCDN = path.resolve(__dirname, 'src', 'itkConfigCDN.js')
const itkConfig = path.resolve(__dirname, 'src', 'itkConfig.js')

const devServer = {
  port: 8082,
  devMiddleware: {
    writeToDisk: true,
  },
  // serve test data, alowing this: data-url="test-data/astronaut.zarr"
  static: {
    publicPath: '/test-data',
    directory: path.join(__dirname, 'test', 'data', 'input'),
    staticOptions: {
      dotfiles: 'allow',
    },
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'X-Requested-With, content-type, Authorization',
  },
}

const fallback = {
  path: false,
  url: false,
  module: false,
  fs: false,
  stream: require.resolve('stream-browserify'),
  crypto: false,
}

const moduleConfigRules = [
  { test: /\.js$/, loader: 'babel-loader', dependency: { not: ['url'] } },
  {
    test: /\.worker.js$/,
    use: [{ loader: 'worker-loader', options: { inline: 'no-fallback' } }],
  },
  {
    test: /\.(png|jpg)$/,
    type: 'asset',
    parser: { dataUrlCondition: { maxSize: 128 * 1024 } },
  }, // 128kb
  { test: /\.svg$/, type: 'asset/source' },
].concat(vtkRules, cssRules)

const performance = {
  maxAssetSize: 20000000,
  maxEntrypointSize: 20000000,
}

module.exports = (env, argv) => [
  {
    name: 'itkVtkViewer.js progressive web app',
    module: {
      rules: moduleConfigRules.concat([
        {
          test: entry,
          loader: 'expose-loader',
          options: { exposes: 'itkVtkViewer' },
        },
      ]),
    },
    devtool: argv.mode === 'development' ? 'eval-source-map' : 'source-map',
    output: {
      filename: 'itkVtkViewer.js',
      publicPath: '',
    },
    resolve: {
      alias: {
        '../itkConfig.js': itkConfig,
        '../../itkConfig.js': itkConfig,
      },
      fallback,
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.join(
              __dirname,
              'node_modules',
              'itk-wasm',
              'dist',
              'web-workers'
            ),
            to: path.join(__dirname, 'dist', 'itk', 'web-workers'),
          },
          {
            from: path.join(
              __dirname,
              'node_modules',
              'itk-wasm',
              'dist',
              'web-workers',
              'min-bundles',
              'pipeline.worker.js'
            ),
            to: path.join(__dirname, 'dist', 'pipeline.worker.js'),
          },
          {
            from: path.join(__dirname, 'node_modules', 'itk-image-io'),
            to: path.join(__dirname, 'dist', 'itk', 'image-io'),
          },
          {
            from: path.join(__dirname, 'node_modules', 'itk-mesh-io'),
            to: path.join(__dirname, 'dist', 'itk', 'mesh-io'),
          },
          {
            from: path.join(
              __dirname,
              'src',
              'Compression',
              'blosc-zarr',
              'web-build'
            ),
            to: path.join(__dirname, 'dist', 'itk', 'pipeline'),
          },
          {
            from: path.join(__dirname, 'src', 'IO', 'Downsample', 'web-build'),
            to: path.join(__dirname, 'dist', 'itk', 'pipeline'),
          },
        ],
      }),
      // workbox plugin should be last plugin.  Don't create in development to avoid warining with devServer --watch
      argv.mode !== 'development'
        ? new GenerateSW({
            cacheId: 'itk-vtk-viewer-',
            cleanupOutdatedCaches: true,
            maximumFileSizeToCacheInBytes: 10000000,
            include: [/(\.js|\.html|\.jpg|\.png)$/],
            exclude: ['serviceWorker.js', /workbox-.*\.js/],
            swDest: path.join(__dirname, 'dist', 'serviceWorker.js'),
            runtimeCaching: [
              {
                urlPattern: /(\.js|\.png|\.wasm)$/,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'itk-vtk-viewer-StaleWhileRevalidate',
                  expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 7 * 24 * 60 * 60 * 2,
                  },
                },
              },
            ],
          })
        : undefined,
      new WebPackBar(),
    ].filter(Boolean), // filter removes optional workbox placehoder
    performance,
    devServer,
  },
  {
    name: 'itkVtkViewerCDN.js <script> tag',
    module: {
      rules: moduleConfigRules.concat([
        {
          test: entry,
          loader: 'expose-loader',
          options: { exposes: 'itkVtkViewer' },
        },
      ]),
    },
    output: {
      filename: 'itkVtkViewerCDN.js',
      publicPath: cdnPath,
      library: {
        name: 'itkVtkViewer',
        type: 'umd',
        umdNamedDefine: true,
      },
    },
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules')],
      alias: {
        '../itkConfig.js': itkConfigCDN,
        '../../itkConfig.js': itkConfigCDN,
      },
      fallback,
    },
    plugins: [
      new webpack.DefinePlugin({
        __itk_version__: JSON.stringify(packageJSON.dependencies['itk-wasm']),
        __itk_vtk_viewer_version__: JSON.stringify(packageJSON.version),
      }),
    ],
    performance,
  },
]

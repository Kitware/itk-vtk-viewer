const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')

const CopyPlugin = require('copy-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const WebPackBar = require('webpackbar')

const entry = path.join(__dirname, './src/index.js')
const sourcePath = path.join(__dirname, './source')
const outputPath = path.join(__dirname, './dist')

const vtkRules = require('vtk.js/Utilities/config/dependency.js').webpack.core
  .rules
const cssRules = require('vtk.js/Utilities/config/dependency.js').webpack.css
  .rules

const packageJSON = require('./package.json')
const version = packageJSON.version
const cdnPath = `https://unpkg.com/itk-vtk-viewer@${version}/dist/itk`

const devServer = {
  noInfo: true,
  stats: 'minimal',
  port: 8080,
  writeToDisk: true,
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

module.exports = [
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
    output: {
      filename: 'itkVtkViewer.js',
    },
    resolve: {
      fallback: { fs: false, stream: require.resolve('stream-browserify') },
    },
    plugins: [
      new CopyPlugin([
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
          from: path.join(__dirname, 'node_modules', 'itk', 'PolyDataIOs'),
          to: path.join(__dirname, 'dist', 'itk', 'PolyDataIOs'),
        },
        {
          from: path.join(__dirname, 'node_modules', 'itk', 'Pipelines'),
          to: path.join(__dirname, 'dist', 'itk', 'Pipelines'),
        },
        {
          from: path.join(
            __dirname,
            'src',
            'Compression',
            'blosc-zarr',
            'web-build'
          ),
          to: path.join(__dirname, 'dist', 'itk', 'Pipelines'),
        },
        {
          from: path.join(__dirname, 'src', 'IO', 'Downsample', 'web-build'),
          to: path.join(__dirname, 'dist', 'itk', 'Pipelines'),
        },
      ]),
      // workbox
      // plugin should be last plugin
      new GenerateSW({
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
      }),
      new WebPackBar(),
    ],
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
        './itkConfig$': path.resolve(__dirname, 'src', 'itkConfigCDN.js'),
      },
      fallback: { fs: false, stream: require.resolve('stream-browserify') },
    },
    performance,
  },
]

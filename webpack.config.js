const path = require('path');
const autoprefixer = require('autoprefixer');

const entry = path.join(__dirname, './src/index.js');
const sourcePath = path.join(__dirname, './source');
const outputPath = path.join(__dirname, './dist');

const vtkRules = require('vtk.js/Utilities/config/dependency').webpack.v2.rules;
const linterRules = require('vtk.js/Utilities/config/rules-linter.js');

const genericAppRules = [
  { test: /\.(png|jpg)$/, use: 'url-loader?limit=40000' },
  { test: /\.html$/, loader: 'html-loader' },
  { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
  { test: /\.mcss$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader', options: { localIdentName: '[sha512:hash:base32]-[name]-[local]', modules: true } },
      { loader: 'postcss-loader', options: { plugins: () => [autoprefixer('last 3 version', 'ie >= 10')] } },
    ],
  },
  { test: /\.cjson$/, loader: 'hson-loader' },
  { test: /\.hson$/, loader: 'hson-loader' },
];

module.exports = {
  node: {
    fs: 'empty',
  },
  entry,
  output: {
    path: outputPath,
    filename: 'itkVtkImageViewer.js',
    publicPath: 'dist/',
  },
  module: {
    rules: [
      { test: entry, loader: 'expose-loader?itkVtkImageViewer' },
      { test: /\.js$/, loader: 'babel-loader', options: { presets: ['es2015'] } },
      { test: /itkImageIOs/,
        use: [
          { loader: 'exports-loader?Module' },
          // {
          //   loader: 'regexp-replace-loader',
          //   options: {
          //     match: {
          //       pattern: '\\(ENVIRONMENT_IS_NODE\\)',
          //       flags: 'g',
          //     },
          //     replaceWith: '(false)',
          //   },
          // },
          // {
          //   loader: 'regexp-replace-loader',
          //   options: {
          //     match: {
          //       pattern: '\\(ENVIRONMENT_IS_SHELL\\)',
          //       flags: 'g',
          //     },
          //     replaceWith: '(false)',
          //   },
          // },
        ],
      },
    ].concat(vtkRules, linterRules, genericAppRules),
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },
};

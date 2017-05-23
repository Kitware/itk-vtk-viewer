const vtkLoaders = require('vtk.js/Utilities/config/webpack.loaders.js');
const path = require('path');

module.exports = {
  baseUrl: '/itk-vtk-image-viewer',
  work: './build-tmp',
  api: ['../src'],
  examples: [],
  config: {
    title: 'itk-vtk-image-viewer',
    description: '"ITK/VTK Image Viewer for the Web"',
    subtitle: '"Enable medical imaging to the Web."',
    author: 'Kitware Inc.',
    timezone: 'UTC',
    url: 'https://kitware.github.io/itk-vtk-image-viewer',
    root: '/itk-vtk-image-viewer/',
    github: 'kitware/itk-vtk-image-viewer',
    google_analytics: 'UA-90338862-7',
  },
  webpack: {
    module: {
      loaders: vtkLoaders,
    },
    resolve: {
      alias: {
        'vtk.js': path.resolve('.'),
      },
    },
  },
  copy: [],
};

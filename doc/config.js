module.exports = {
  baseUrl: '/itk-vtk-viewer',
  work: './build-tmp',
  examples: [],
  config: {
    title: 'itk-vtk-viewer',
    description: '"ITK/VTK Image Viewer for the Web"',
    subtitle: '"Enable medical imaging to the Web."',
    author: 'Kitware Inc.',
    timezone: 'UTC',
    url: 'https://kitware.github.io/itk-vtk-viewer',
    root: '/itk-vtk-viewer/',
    github: 'kitware/itk-vtk-viewer',
    google_analytics: 'UA-90338862-7',
  },
  copy: [
    { src: '../dist/*', dest: './build-tmp/public/app' },
  ],
};

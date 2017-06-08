const EXTENSION_MAP = {
  dcm: 'GDCM',
  mha: 'Meta',
  mhd: 'Meta',
  nhdr: 'Nrrd',
  nrrd: 'Nrrd',
  png: 'PNG',
  tif: 'TIFF',
  tiff: 'TIFF',
  vtk: 'VTK',
};

function loadModule(ext) {
  const type = EXTENSION_MAP[ext.toLowerCase()];
  if (type) {
    return System.import(`itk/dist/itkImageIOs/itk${type}ImageIOJSBinding.js`);
  }
  return new Promise((resolve, reject) => reject(`No module find for extension ${ext}`));
}

export default {
  loadModule,
};

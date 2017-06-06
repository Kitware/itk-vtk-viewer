// import GDCM from 'itk/dist/itkImageIOs/itkGDCMImageIOJSBinding'; // Why we need ws?
import Meta from 'itk/dist/itkImageIOs/itkMetaImageIOJSBinding';
import NRRD from 'itk/dist/itkImageIOs/itkNrrdImageIOJSBinding';
import PNG from 'itk/dist/itkImageIOs/itkPNGImageIOJSBinding';
import TIFF from 'itk/dist/itkImageIOs/itkTIFFImageIOJSBinding';
import VTK from 'itk/dist/itkImageIOs/itkVTKImageIOJSBinding';

const MODULE_MAP = {
  // dcm: GDCM,
  mha: Meta,
  mhd: Meta,
  nhdr: NRRD,
  nrrd: NRRD,
  png: PNG,
  tif: TIFF,
  tiff: TIFF,
  vtk: VTK,
};

// ----------------------------------------------------------------------------

function loadModule(ext) {
  const module = MODULE_MAP[ext];
  return new Promise((resolve, reject) => {
    if (module) {
      resolve(module);
    } else {
      reject(`No module find for extension ${ext}`);
    }
  });
}

export default {
  loadModule,
};

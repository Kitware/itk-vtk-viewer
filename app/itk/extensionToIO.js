var extensionToIO = {};

extensionToIO['bmp'] = 'itkBMPImageIOJSBinding';
extensionToIO['BMP'] = 'itkBMPImageIOJSBinding';

extensionToIO['dcm'] = 'itkGDCMImageIOJSBinding';
extensionToIO['DCM'] = 'itkGDCMImageIOJSBinding';

extensionToIO['jpg'] = 'itkJPEGImageIOJSBinding';
extensionToIO['JPG'] = 'itkJPEGImageIOJSBinding';
extensionToIO['jpeg'] = 'itkJPEGImageIOJSBinding';
extensionToIO['JPEG'] = 'itkJPEGImageIOJSBinding';

extensionToIO['mha'] = 'itkMetaImageIOJSBinding';
extensionToIO['mhd'] = 'itkMetaImageIOJSBinding';

extensionToIO['nia'] = 'itkNiftiImageIOJSBinding';
extensionToIO['nii'] = 'itkNiftiImageIOJSBinding';
// todo: properly support .nii.gz
extensionToIO['gz'] = 'itkNiftiImageIOJSBinding';
extensionToIO['hdr'] = 'itkNiftiImageIOJSBinding';

extensionToIO['nrrd'] = 'itkNrrdImageIOJSBinding';
extensionToIO['NRRD'] = 'itkNrrdImageIOJSBinding';
extensionToIO['nhdr'] = 'itkNrrdImageIOJSBinding';
extensionToIO['NHDR'] = 'itkNrrdImageIOJSBinding';

extensionToIO['png'] = 'itkPNGImageIOJSBinding';
extensionToIO['PNG'] = 'itkPNGImageIOJSBinding';

extensionToIO['tif'] = 'itkTIFFImageIOJSBinding';
extensionToIO['TIF'] = 'itkTIFFImageIOJSBinding';
extensionToIO['tiff'] = 'itkTIFFImageIOJSBinding';
extensionToIO['TIFF'] = 'itkTIFFImageIOJSBinding';

extensionToIO['vtk'] = 'itkVTKImageIOJSBinding';
extensionToIO['VTK'] = 'itkVTKImageIOJSBinding';

module.exports = extensionToIO;
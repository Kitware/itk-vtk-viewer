var extensionToIO = {};

extensionToIO['dcm'] = 'itkGDCMImageIOJSBinding';

extensionToIO['nrrd'] = 'itkNrrdImageIOJSBinding';
extensionToIO['NRRD'] = 'itkNrrdImageIOJSBinding';

extensionToIO['nhdr'] = 'itkNrrdImageIOJSBinding';
extensionToIO['NHDR'] = 'itkNrrdImageIOJSBinding';
extensionToIO['png'] = 'itkPNGImageIOJSBinding';
extensionToIO['PNG'] = 'itkPNGImageIOJSBinding';

module.exports = extensionToIO;
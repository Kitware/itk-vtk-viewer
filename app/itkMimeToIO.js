var mimeToIO = {};

mimeToIO['image/png'] = 'itkPNGImageIOJSBinding';
mimeToIO['application/dicom'] = 'itkGDCMImageIOJSBinding';

module.exports = mimeToIO;
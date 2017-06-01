var mimeToIO = {};

mimeToIO['image/png'] = 'itkPNGImageIOJSBinding';
mimeToIO['image/tiff'] = 'itkTIFFImageIOJSBinding';
mimeToIO['application/dicom'] = 'itkGDCMImageIOJSBinding';

module.exports = mimeToIO;
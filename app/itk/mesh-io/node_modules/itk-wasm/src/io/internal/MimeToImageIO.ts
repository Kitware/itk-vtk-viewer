const mimeToIO = new Map([
  ['image/jpeg', 'JPEGImageIO'],
  ['image/png', 'PNGImageIO'],
  ['image/tiff', 'TIFFImageIO'],
  ['image/x-ms-bmp', 'BMPImageIO'],
  ['image/x-bmp', 'BMPImageIO'],
  ['image/bmp', 'BMPImageIO'],
  ['application/dicom', 'GDCMImageIO']
])

export default mimeToIO

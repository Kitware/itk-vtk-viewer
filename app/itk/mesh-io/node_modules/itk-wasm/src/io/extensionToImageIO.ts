const extensionToIO = new Map([
  ['bmp', 'BMPImageIO'],
  ['BMP', 'BMPImageIO'],

  ['dcm', 'GDCMImageIO'],
  ['DCM', 'GDCMImageIO'],

  ['gipl', 'GiplImageIO'],
  ['gipl.gz', 'GiplImageIO'],

  ['hdf5', 'HDF5ImageIO'],

  ['jpg', 'JPEGImageIO'],
  ['JPG', 'JPEGImageIO'],
  ['jpeg', 'JPEGImageIO'],
  ['JPEG', 'JPEGImageIO'],

  ['iwi', 'WASMImageIO'],
  ['iwi.cbor', 'WASMImageIO'],
  ['iwi.cbor.zstd', 'WASMZstdImageIO'],

  ['lsm', 'LSMImageIO'],

  ['mnc', 'MINCImageIO'],
  ['MNC', 'MINCImageIO'],
  ['mnc.gz', 'MINCImageIO'],
  ['MNC.GZ', 'MINCImageIO'],
  ['mnc2', 'MINCImageIO'],
  ['MNC2', 'MINCImageIO'],

  ['mgh', 'MGHImageIO'],
  ['mgz', 'MGHImageIO'],
  ['mgh.gz', 'MGHImageIO'],

  ['mha', 'MetaImageIO'],
  ['mhd', 'MetaImageIO'],

  ['mrc', 'MRCImageIO'],

  ['nia', 'NiftiImageIO'],
  ['nii', 'NiftiImageIO'],
  ['nii.gz', 'NiftiImageIO'],
  ['hdr', 'NiftiImageIO'],

  ['nrrd', 'NrrdImageIO'],
  ['NRRD', 'NrrdImageIO'],
  ['nhdr', 'NrrdImageIO'],
  ['NHDR', 'NrrdImageIO'],

  ['png', 'PNGImageIO'],
  ['PNG', 'PNGImageIO'],

  ['pic', 'BioRadImageIO'],
  ['PIC', 'BioRadImageIO'],

  ['tif', 'TIFFImageIO'],
  ['TIF', 'TIFFImageIO'],
  ['tiff', 'TIFFImageIO'],
  ['TIFF', 'TIFFImageIO'],

  ['vtk', 'VTKImageIO'],
  ['VTK', 'VTKImageIO'],

  ['isq', 'ScancoImageIO'],
  ['ISQ', 'ScancoImageIO'],

  ['fdf', 'FDFImageIO'],
  ['FDF', 'FDFImageIO']
])

export default extensionToIO

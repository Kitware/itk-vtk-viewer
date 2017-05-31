var Image = require('./itkImage.js');
var ImageType = require('./itkImageType.js');
var IntTypes = require('./itkIntTypes.js');
var FloatTypes = require('./itkFloatTypes.js');
var Matrix = require('./itkMatrix.js');

var readImage = require('./itkreadImage.js');
var readImageFile = require('./itkreadImageFile.js');
var readImageLocalFile = require('./itkreadImageLocalFile.js');

module.exports = {
  Int8: IntTypes.Int8,
  UInt8: IntTypes.UInt8,
  Int16: IntTypes.Int16,
  UInt16: IntTypes.UInt16,
  Int32: IntTypes.Int32,
  UInt32: IntTypes.UInt32,
  Int64: IntTypes.Int64,
  UInt64: IntTypes.UInt64,
  SizeValueType: IntTypes.SizeValueType,
  IdentifierType: IntTypes.IdentifierType,
  IndexValueType: IntTypes.IndexValueType,
  OffsetValueType: IntTypes.OffsetValueType,
  Float32: FloatTypes.Float32,
  Float64: FloatTypes.Float64,
  SpacePrecisionType: FloatTypes.SpacePrecisionType,
  Image: Image,
  ImageType: ImageType,
  Matrix: Matrix,
  readImageFile: readImageFile,
  readImageLocalFile: readImageLocalFile,
  readImage: readImage
};
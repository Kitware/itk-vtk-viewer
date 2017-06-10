var Image = require('./Image.js');
var ImageType = require('./ImageType.js');
var IntTypes = require('./IntTypes.js');
var FloatTypes = require('./FloatTypes.js');
var PixelTypes = require('./PixelTypes.js');
var Matrix = require('./Matrix.js');

var readImageEmscriptenFSFile = function readImageEmscriptenFSFile(module, filePath) {
  var imageIO = new module.ITKImageIO();
  imageIO.SetFileName(filePath);
  if (!imageIO.CanReadFile(filePath)) {
    return null;
  }
  imageIO.ReadImageInformation();

  var ioDimensions = imageIO.GetNumberOfDimensions();
  var imageType = new ImageType(ioDimensions);

  var ioComponentType = imageIO.GetComponentType();
  switch (ioComponentType) {
    case module.IOComponentType.UCHAR:
      {
        imageType.componentType = IntTypes.UInt8;
        break;
      }
    case module.IOComponentType.CHAR:
      {
        imageType.componentType = IntTypes.Int8;
        break;
      }
    case module.IOComponentType.USHORT:
      {
        imageType.componentType = IntTypes.UInt16;
        break;
      }
    case module.IOComponentType.SHORT:
      {
        imageType.componentType = IntTypes.Int16;
        break;
      }
    case module.IOComponentType.UINT:
      {
        imageType.componentType = IntTypes.UInt32;
        break;
      }
    case module.IOComponentType.INT:
      {
        imageType.componentType = IntTypes.Int32;
        break;
      }
    case module.IOComponentType.ULONG:
      {
        imageType.componentType = IntTypes.UInt64;
        break;
      }
    case module.IOComponentType.LONG:
      {
        imageType.componentType = IntTypes.Int64;
        break;
      }
    case module.IOComponentType.FLOAT:
      {
        imageType.componentType = FloatTypes.Float32;
        break;
      }
    case module.IOComponentType.DOUBLE:
      {
        imageType.componentType = FloatTypes.Float64;
        break;
      }
    default:
      console.error('Unknown IO component type');
      return null;
  }

  var ioPixelType = imageIO.GetPixelType();
  switch (ioPixelType) {
    case module.IOPixelType.UNKNOWNPIXELTYPE:
      {
        imageType.pixelType = PixelTypes.Unknown;
        break;
      }
    case module.IOPixelType.SCALAR:
      {
        imageType.pixelType = PixelTypes.Scalar;
        break;
      }
    case module.IOPixelType.RGB:
      {
        imageType.pixelType = PixelTypes.RGB;
        break;
      }
    case module.IOPixelType.RGBA:
      {
        imageType.pixelType = PixelTypes.RGBA;
        break;
      }
    case module.IOPixelType.OFFSET:
      {
        imageType.pixelType = PixelTypes.Offset;
        break;
      }
    case module.IOPixelType.VECTOR:
      {
        imageType.pixelType = PixelTypes.Vector;
        break;
      }
    case module.IOPixelType.POINT:
      {
        imageType.pixelType = PixelTypes.Point;
        break;
      }
    case module.IOPixelType.COVARIANTVECTOR:
      {
        imageType.pixelType = PixelTypes.CovariantVector;
        break;
      }
    case module.IOPixelType.SYMMETRICSECONDRANKTENSOR:
      {
        imageType.pixelType = PixelTypes.SymmetricSecondRankTensor;
        break;
      }
    case module.IOPixelType.DIFFUSIONTENSOR3D:
      {
        imageType.pixelType = PixelTypes.DiffusionTensor3D;
        break;
      }
    case module.IOPixelType.COMPLEX:
      {
        imageType.pixelType = PixelTypes.Complex;
        break;
      }
    case module.IOPixelType.FIXEDARRAY:
      {
        imageType.pixelType = PixelTypes.FixedArray;
        break;
      }
    case module.IOPixelType.MATRIX:
      {
        imageType.pixelType = PixelTypes.Matrix;
        break;
      }
    default:
      console.error('Unknown IO pixel type');
      return null;
  }

  imageType.components = imageIO.GetNumberOfComponents();

  var image = new Image(imageType);

  var ioDirection = new Matrix(ioDimensions, ioDimensions);
  for (var ii = 0; ii < ioDimensions; ++ii) {
    var directionColumn = imageIO.GetDirection(ii);
    for (var jj = 0; jj < ioDimensions; ++jj) {
      ioDirection.setElement(jj, ii, directionColumn.get(jj));
    }
  }

  for (var _ii = 0; _ii < image.imageType.dimension; ++_ii) {
    if (_ii < ioDimensions) {
      image.size[_ii] = imageIO.GetDimensions(_ii);
      image.spacing[_ii] = imageIO.GetSpacing(_ii);
      image.origin[_ii] = imageIO.GetOrigin(_ii);
      for (var _jj = 0; _jj < image.imageType.dimension; ++_jj) {
        if (_jj < ioDimensions) {
          var element = ioDirection.getElement(_jj, _ii);
          image.direction.setElement(_jj, _ii, element);
        } else {
          image.direction.setElement(_jj, _ii, 0.0);
        }
      }
    } else {
      image.size[_ii] = 0;
      image.spacing[_ii] = 1.0;
      image.origin[_ii] = 0.0;
      image.direction.setIdentity();
    }
  }

  // Spacing is expected to be greater than 0
  // If negative, flip image direction along this axis.
  for (var _ii2 = 0; _ii2 < image.imageType.dimension; ++_ii2) {
    if (image.spacing[_ii2] < 0.0) {
      image.spacing[_ii2] = -image.spacing[_ii2];
      for (var _jj2 = 0; _jj2 < image.imageType.dimension; ++_jj2) {
        image.direction.setElement(_ii2, _jj2, -1 * image.direction.getElement(_ii2, _jj2));
      }
    }
  }

  image.buffer = imageIO.Read();

  return image;
};

module.exports = readImageEmscriptenFSFile;
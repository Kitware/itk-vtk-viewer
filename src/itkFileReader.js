import Image from 'itk/dist/itkImage.js';
import ImageType from 'itk/dist/itkImageType';
import IntTypes from 'itk/dist/itkIntTypes';
import FloatTypes from 'itk/dist/itkFloatTypes';
import PixelTypes from 'itk/dist/itkPixelTypes';
import Matrix from 'itk/dist/itkMatrix';

import ModuleLoader from './StaticModuleLoader';

// ----------------------------------------------------------------------------

function readImage(module, filePath) {
  const imageIO = new module.ITKImageIO();
  imageIO.SetFileName(filePath);
  if (!imageIO.CanReadFile(filePath)) {
    console.log(`Reader can not read file ${filePath}`);
    return null;
  }
  imageIO.ReadImageInformation();

  const ioDimensions = imageIO.GetNumberOfDimensions();
  const imageType = new ImageType(ioDimensions);

  const ioComponentType = imageIO.GetComponentType();
  switch (ioComponentType) {
    case module.IOComponentType.UCHAR: {
      imageType.componentType = IntTypes.UInt8;
      break;
    }
    case module.IOComponentType.CHAR: {
      imageType.componentType = IntTypes.Int8;
      break;
    }
    case module.IOComponentType.USHORT: {
      imageType.componentType = IntTypes.UInt16;
      break;
    }
    case module.IOComponentType.SHORT: {
      imageType.componentType = IntTypes.Int16;
      break;
    }
    case module.IOComponentType.UINT: {
      imageType.componentType = IntTypes.UInt32;
      break;
    }
    case module.IOComponentType.INT: {
      imageType.componentType = IntTypes.Int32;
      break;
    }
    case module.IOComponentType.ULONG: {
      imageType.componentType = IntTypes.UInt64;
      break;
    }
    case module.IOComponentType.LONG: {
      imageType.componentType = IntTypes.Int64;
      break;
    }
    case module.IOComponentType.FLOAT: {
      imageType.componentType = FloatTypes.Float32;
      break;
    }
    case module.IOComponentType.DOUBLE: {
      imageType.componentType = FloatTypes.Float64;
      break;
    }
    default:
      console.error('Unknown IO component type');
      return null;
  }

  const ioPixelType = imageIO.GetPixelType();
  switch (ioPixelType) {
    case module.IOPixelType.UNKNOWNPIXELTYPE: {
      imageType.pixelType = PixelTypes.Unknown;
      break;
    }
    case module.IOPixelType.SCALAR: {
      imageType.pixelType = PixelTypes.Scalar;
      break;
    }
    case module.IOPixelType.RGB: {
      imageType.pixelType = PixelTypes.RGB;
      break;
    }
    case module.IOPixelType.RGBA: {
      imageType.pixelType = PixelTypes.RGBA;
      break;
    }
    case module.IOPixelType.OFFSET: {
      imageType.pixelType = PixelTypes.Offset;
      break;
    }
    case module.IOPixelType.VECTOR: {
      imageType.pixelType = PixelTypes.Vector;
      break;
    }
    case module.IOPixelType.POINT: {
      imageType.pixelType = PixelTypes.Point;
      break;
    }
    case module.IOPixelType.COVARIANTVECTOR: {
      imageType.pixelType = PixelTypes.CovariantVector;
      break;
    }
    case module.IOPixelType.SYMMETRICSECONDRANKTENSOR: {
      imageType.pixelType = PixelTypes.SymmetricSecondRankTensor;
      break;
    }
    case module.IOPixelType.DIFFUSIONTENSOR3D: {
      imageType.pixelType = PixelTypes.DiffusionTensor3D;
      break;
    }
    case module.IOPixelType.COMPLEX: {
      imageType.pixelType = PixelTypes.Complex;
      break;
    }
    case module.IOPixelType.FIXEDARRAY: {
      imageType.pixelType = PixelTypes.FixedArray;
      break;
    }
    case module.IOPixelType.MATRIX: {
      imageType.pixelType = PixelTypes.Matrix;
      break;
    }
    default:
      console.error('Unknown IO pixel type');
      return null;
  }

  imageType.components = imageIO.GetNumberOfComponents();

  const image = new Image(imageType);

  const ioDirection = new Matrix(ioDimensions, ioDimensions);
  for (let ii = 0; ii < ioDimensions; ++ii) {
    const directionColumn = imageIO.GetDirection(ii);
    for (let jj = 0; jj < ioDimensions; ++jj) {
      ioDirection.setElement(jj, ii, directionColumn.get(jj));
    }
  }

  for (let ii = 0; ii < image.imageType.dimension; ++ii) {
    if (ii < ioDimensions) {
      image.size[ii] = imageIO.GetDimensions(ii);
      image.spacing[ii] = imageIO.GetSpacing(ii);
      image.origin[ii] = imageIO.GetOrigin(ii);
      for (let jj = 0; jj < image.imageType.dimension; ++jj) {
        if (jj < ioDimensions) {
          const element = ioDirection.getElement(jj, ii);
          image.direction.setElement(jj, ii, element);
        } else {
          image.direction.setElement(jj, ii, 0.0);
        }
      }
    } else {
      image.size[ii] = 0;
      image.spacing[ii] = 1.0;
      image.origin[ii] = 0.0;
      image.direction.setIdentity();
    }
  }

  // Spacing is expected to be greater than 0
  // If negative, flip image direction along this axis.
  for (let ii = 0; ii < image.imageType.dimension; ++ii) {
    if (image.spacing[ii] < 0.0) {
      image.spacing[ii] = -image.spacing[ii];
      for (let jj = 0; jj < image.imageType.dimension; ++jj) {
        image.direction.setElement(ii, jj, -1 * image.direction.getElement(ii, jj));
      }
    }
  }

  image.buffer = imageIO.Read();

  return image;
}

// ----------------------------------------------------------------------------

export function readAsArrayBuffer(file) {
  if (!(file instanceof Blob)) {
    throw new TypeError('Must be a File or Blob');
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e => resolve(e.target.result));
    reader.onerror = (e => reject(`Error reading ${file.name}: ${e.target.result}`));
    reader.readAsArrayBuffer(file);
  });
}

// ----------------------------------------------------------------------------

export function readImageFile(file) {
  return readAsArrayBuffer(file)
    .then(arrayBuffer =>
      new Promise((resolve, reject) => {
        const extension = file.name.split('.').pop().toLowerCase();
        console.log('extension', extension, arrayBuffer);
        ModuleLoader.loadModule(extension)
          .then(
            (ioModule) => {
              const blob = new Blob([arrayBuffer]);
              const blobs = [{ name: file.name, data: blob }];
              const mountpoint = '/work';
              ioModule.mountBlobs(mountpoint, blobs);
              const image = readImage(ioModule, `${mountpoint}/${file.name}`);
              ioModule.unmountBlobs(mountpoint);
              return resolve(image);
            },
            (args) => {
              console.error(...args);
            });
      }));
}

export default readImageFile;

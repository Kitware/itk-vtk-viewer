import PixelTypes from '../../core/PixelTypes.js'

import IOPixel from './IOPixel.js'
import IOEmscriptenModule from './IOEmscriptenModule.js'

function imageJSPixelTypeToIOPixelType (emscriptenModule: IOEmscriptenModule,
  pixelType: typeof PixelTypes[keyof typeof PixelTypes]): typeof IOPixel[keyof typeof IOPixel] {
  let ioPixelType = null
  switch (pixelType) {
    case PixelTypes.Unknown: {
      ioPixelType = emscriptenModule.IOPixelType.UNKNOWNPIXELTYPE
      break
    }
    case PixelTypes.Scalar: {
      ioPixelType = emscriptenModule.IOPixelType.SCALAR
      break
    }
    case PixelTypes.RGB: {
      ioPixelType = emscriptenModule.IOPixelType.RGB
      break
    }
    case PixelTypes.RGBA: {
      ioPixelType = emscriptenModule.IOPixelType.RGBA
      break
    }
    case PixelTypes.Offset: {
      ioPixelType = emscriptenModule.IOPixelType.OFFSET
      break
    }
    case PixelTypes.Vector: {
      ioPixelType = emscriptenModule.IOPixelType.VECTOR
      break
    }
    case PixelTypes.Point: {
      ioPixelType = emscriptenModule.IOPixelType.POINT
      break
    }
    case PixelTypes.CovariantVector: {
      ioPixelType = emscriptenModule.IOPixelType.COVARIANTVECTOR
      break
    }
    case PixelTypes.SymmetricSecondRankTensor: {
      ioPixelType = emscriptenModule.IOPixelType.SYMMETRICSECONDRANKTENSOR
      break
    }
    case PixelTypes.DiffusionTensor3D: {
      ioPixelType = emscriptenModule.IOPixelType.DIFFUSIONTENSOR3D
      break
    }
    case PixelTypes.Complex: {
      ioPixelType = emscriptenModule.IOPixelType.COMPLEX
      break
    }
    case PixelTypes.FixedArray: {
      ioPixelType = emscriptenModule.IOPixelType.FIXEDARRAY
      break
    }
    case PixelTypes.Matrix: {
      ioPixelType = emscriptenModule.IOPixelType.MATRIX
      break
    }
    default:
      throw new Error('Unknown IO pixel type')
  }
  return ioPixelType
}

export default imageJSPixelTypeToIOPixelType

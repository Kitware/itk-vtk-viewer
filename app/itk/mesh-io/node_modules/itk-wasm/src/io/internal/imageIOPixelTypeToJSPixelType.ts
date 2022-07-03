import PixelTypes from '../../core/PixelTypes.js'
import IOPixel from './IOPixel.js'

import IOEmscriptenModule from './IOEmscriptenModule.js'

function imageIOPixelTypeToJSPixelType (emscriptenModule: IOEmscriptenModule, ioPixelType: typeof IOPixel[keyof typeof IOPixel]): typeof PixelTypes[keyof typeof PixelTypes] {
  let pixelType = null
  switch (ioPixelType) {
    case emscriptenModule.IOPixelType.UNKNOWNPIXELTYPE: {
      pixelType = PixelTypes.Unknown
      break
    }
    case emscriptenModule.IOPixelType.SCALAR: {
      pixelType = PixelTypes.Scalar
      break
    }
    case emscriptenModule.IOPixelType.RGB: {
      pixelType = PixelTypes.RGB
      break
    }
    case emscriptenModule.IOPixelType.RGBA: {
      pixelType = PixelTypes.RGBA
      break
    }
    case emscriptenModule.IOPixelType.OFFSET: {
      pixelType = PixelTypes.Offset
      break
    }
    case emscriptenModule.IOPixelType.VECTOR: {
      pixelType = PixelTypes.Vector
      break
    }
    case emscriptenModule.IOPixelType.POINT: {
      pixelType = PixelTypes.Point
      break
    }
    case emscriptenModule.IOPixelType.COVARIANTVECTOR: {
      pixelType = PixelTypes.CovariantVector
      break
    }
    case emscriptenModule.IOPixelType.SYMMETRICSECONDRANKTENSOR: {
      pixelType = PixelTypes.SymmetricSecondRankTensor
      break
    }
    case emscriptenModule.IOPixelType.DIFFUSIONTENSOR3D: {
      pixelType = PixelTypes.DiffusionTensor3D
      break
    }
    case emscriptenModule.IOPixelType.COMPLEX: {
      pixelType = PixelTypes.Complex
      break
    }
    case emscriptenModule.IOPixelType.FIXEDARRAY: {
      pixelType = PixelTypes.FixedArray
      break
    }
    case emscriptenModule.IOPixelType.MATRIX: {
      pixelType = PixelTypes.Matrix
      break
    }
    default:
      throw new Error('Unknown IO pixel type')
  }
  return pixelType
}

export default imageIOPixelTypeToJSPixelType

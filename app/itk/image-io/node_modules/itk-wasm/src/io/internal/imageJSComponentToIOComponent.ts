import IntTypes from '../../core/IntTypes.js'
import FloatTypes from '../../core/FloatTypes.js'

import IOComponent from './IOComponent.js'
import IOEmscriptenModule from './IOEmscriptenModule.js'

function imageJSComponentToIOComponent (emscriptenModule: IOEmscriptenModule,
  componentType: typeof IntTypes[keyof typeof IntTypes] | typeof FloatTypes[keyof typeof FloatTypes] | null): typeof IOComponent[keyof typeof IOComponent] | null {
  let ioComponentType = null
  switch (componentType) {
    case IntTypes.UInt8: {
      ioComponentType = emscriptenModule.IOComponentType.UCHAR
      break
    }
    case IntTypes.Int8: {
      ioComponentType = emscriptenModule.IOComponentType.CHAR
      break
    }
    case IntTypes.UInt16: {
      ioComponentType = emscriptenModule.IOComponentType.USHORT
      break
    }
    case IntTypes.Int16: {
      ioComponentType = emscriptenModule.IOComponentType.SHORT
      break
    }
    case IntTypes.UInt32: {
      ioComponentType = emscriptenModule.IOComponentType.UINT
      break
    }
    case IntTypes.Int32: {
      ioComponentType = emscriptenModule.IOComponentType.INT
      break
    }
    case IntTypes.UInt64: {
      ioComponentType = emscriptenModule.IOComponentType.ULONGLONG
      break
    }
    case IntTypes.Int64: {
      ioComponentType = emscriptenModule.IOComponentType.LONGLONG
      break
    }
    case FloatTypes.Float32: {
      ioComponentType = emscriptenModule.IOComponentType.FLOAT
      break
    }
    case FloatTypes.Float64: {
      ioComponentType = emscriptenModule.IOComponentType.DOUBLE
      break
    }
    default:
      throw new Error('Unknown IO component type')
  }

  return ioComponentType
}

export default imageJSComponentToIOComponent

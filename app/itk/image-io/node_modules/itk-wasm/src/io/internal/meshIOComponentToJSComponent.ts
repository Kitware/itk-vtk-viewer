import IntTypes from '../../core/IntTypes.js'
import FloatTypes from '../../core/FloatTypes.js'
import IOEmscriptenModule from './IOEmscriptenModule.js'
import IOComponent from './IOComponent.js'

function meshIOComponentToJSComponent (emscriptenModule: IOEmscriptenModule, ioComponentType: typeof IOComponent[keyof typeof IOComponent]):
  typeof IntTypes[keyof typeof IntTypes] | typeof FloatTypes[keyof typeof FloatTypes] | null {
  let componentType = null
  switch (ioComponentType) {
    case emscriptenModule.IOComponentType.UNKNOWNCOMPONENTTYPE: {
      componentType = null
      break
    }
    case emscriptenModule.IOComponentType.UCHAR: {
      componentType = IntTypes.UInt8
      break
    }
    case emscriptenModule.IOComponentType.CHAR: {
      componentType = IntTypes.Int8
      break
    }
    case emscriptenModule.IOComponentType.USHORT: {
      componentType = IntTypes.UInt16
      break
    }
    case emscriptenModule.IOComponentType.SHORT: {
      componentType = IntTypes.Int16
      break
    }
    case emscriptenModule.IOComponentType.UINT: {
      componentType = IntTypes.UInt32
      break
    }
    case emscriptenModule.IOComponentType.INT: {
      componentType = IntTypes.Int32
      break
    }
    case emscriptenModule.IOComponentType.ULONG: {
      componentType = IntTypes.UInt64
      break
    }
    case emscriptenModule.IOComponentType.LONG: {
      componentType = IntTypes.Int64
      break
    }
    case emscriptenModule.IOComponentType.ULONGLONG: {
      componentType = IntTypes.UInt64
      break
    }
    case emscriptenModule.IOComponentType.LONGLONG: {
      componentType = IntTypes.Int64
      break
    }
    case emscriptenModule.IOComponentType.FLOAT: {
      componentType = FloatTypes.Float32
      break
    }
    case emscriptenModule.IOComponentType.DOUBLE: {
      componentType = FloatTypes.Float64
      break
    }
    default:
      throw new Error('Unknown IO component type')
  }

  return componentType
}

export default meshIOComponentToJSComponent

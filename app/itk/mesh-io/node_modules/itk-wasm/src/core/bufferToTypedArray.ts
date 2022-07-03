import IntTypes from './IntTypes.js'
import FloatTypes from './FloatTypes.js'
import type TypedArray from './TypedArray.js'

function bufferToTypedArray (wasmType: typeof IntTypes[keyof typeof IntTypes] | typeof FloatTypes[keyof typeof FloatTypes] | 'null' | null, buffer: ArrayBuffer): null | TypedArray {
  let typedArray: null | TypedArray = null
  switch (wasmType) {
    case IntTypes.UInt8: {
      typedArray = new Uint8Array(buffer)
      break
    }
    case IntTypes.Int8: {
      typedArray = new Int8Array(buffer)
      break
    }
    case IntTypes.UInt16: {
      typedArray = new Uint16Array(buffer)
      break
    }
    case IntTypes.Int16: {
      typedArray = new Int16Array(buffer)
      break
    }
    case IntTypes.UInt32: {
      typedArray = new Uint32Array(buffer)
      break
    }
    case IntTypes.Int32: {
      typedArray = new Int32Array(buffer)
      break
    }
    case IntTypes.UInt64: {
      if (typeof globalThis.BigUint64Array === 'function') {
        typedArray = new BigUint64Array(buffer)
      } else {
        // Sub with reasonable default. Will get cast to Uint8Array when
        // transferred to WebAssembly.
        typedArray = new Uint8Array(buffer)
      }
      break
    }
    case IntTypes.Int64: {
      if (typeof globalThis.BigInt64Array === 'function') {
        typedArray = new BigInt64Array(buffer)
      } else {
        // Sub with reasonable default. Will get cast to Uint8Array when
        // transferred to WebAssembly.
        typedArray = new Uint8Array(buffer)
      }
      break
    }
    case FloatTypes.Float32: {
      typedArray = new Float32Array(buffer)
      break
    }
    case FloatTypes.Float64: {
      typedArray = new Float64Array(buffer)
      break
    }
    case 'null': {
      typedArray = null
      break
    }
    case null: {
      typedArray = null
      break
    }
    default:
      throw new Error('Type is not supported as a TypedArray')
  }

  return typedArray
}

export default bufferToTypedArray

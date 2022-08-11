import { IntTypes, FloatTypes } from 'itk-wasm'

// Currently missing on Safari
const bigIntArrayType =
  typeof globalThis.BigInt64Array === 'function'
    ? globalThis.BigInt64Array
    : Int32Array
const bigUintArrayType =
  typeof globalThis.BigUint64Array === 'function'
    ? globalThis.BigUint64Array
    : Uint32Array

// key is sans endian
const dtypeUtils = Array.from(
  new Map([
    ['b', [Int8Array, 'getInt8', IntTypes.Int8]],
    ['B', [Uint8Array, 'getUint8', IntTypes.UInt8]],
    ['u1', [Uint8Array, 'getUint8', IntTypes.UInt8]],
    ['i1', [Int8Array, 'getInt8', IntTypes.Int8]],
    ['u2', [Uint16Array, 'getUint16', IntTypes.UInt16]],
    ['i2', [Int16Array, 'getInt16', IntTypes.Int16]],
    ['u4', [Uint32Array, 'getUint32', IntTypes.UInt32]],
    ['i4', [Int32Array, 'getInt32', IntTypes.Int32]],
    ['u8', [bigUintArrayType, 'getBigUint64', IntTypes.UInt64]],
    ['i8', [bigIntArrayType, 'getBigInt64', IntTypes.Int64]],

    ['f4', [Float32Array, 'getFloat32', FloatTypes.Float32]],
    ['f8', [Float64Array, 'getFloat64', FloatTypes.Float64]],
  ])
).reduce(
  (map, [dtype, [TypedArray, dataViewGetter, itkComponent]]) =>
    map.set(dtype, { TypedArray, dataViewGetter, itkComponent }),
  new Map()
)

const getType = dtype => dtype.replace(/^(<|>|=|\|)/, '') // remove starting < > = | endianness

export const getSize = dtype => {
  const type = getType(dtype)
  return type.length < 2 ? 1 : Number(type.slice(-1))
}

export const getComponentType = dtype =>
  dtypeUtils.get(getType(dtype)).itkComponent

export const getTypedArray = dtype => dtypeUtils.get(getType(dtype)).TypedArray

export const testLittleEndian = dtype => dtype.charAt(0) === '<'

export const ElementGetter = (dtype, buffer) => {
  const view = new DataView(buffer)
  const size = getSize(dtype)
  const isLittleEndian = testLittleEndian(dtype)
  const { dataViewGetter } = dtypeUtils.get(getType(dtype))

  return index => view[dataViewGetter](index * size, isLittleEndian)
}

export const getDtype = (typedArrayConstructor, endianness = '<') => {
  const typedArrayToDtype = new Map(
    Array.from(dtypeUtils).map(([key, { TypedArray }]) => [TypedArray, key])
  )
  return `${endianness}${typedArrayToDtype.get(typedArrayConstructor)}`
}

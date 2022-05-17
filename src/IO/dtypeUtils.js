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

const dtypeToTypedArray = new Map([
  ['<b', Int8Array],
  ['<B', Uint8Array],
  ['<u1', Uint8Array],
  ['>u1', Uint8Array],
  ['|u1', Uint8Array],
  ['<i1', Int8Array],
  ['|i1', Int8Array],
  ['<u2', Uint16Array],
  ['<i2', Int16Array],
  ['<u4', Uint32Array],
  ['<i4', Int32Array],
  ['<u8', bigUintArrayType],
  ['<i8', bigIntArrayType],

  ['<f4', Float32Array],
  ['<f8', Float64Array],
])

export default dtypeToTypedArray

export const getSize = dtype => {
  if (dtype.length < 2) return 1 // handle <b and <B
  return Number(dtype.slice(-1))
}

// sans endian
const dtypeToComponentType = new Map([
  ['b', IntTypes.Int8],
  ['B', IntTypes.UInt8],
  ['u1', IntTypes.UInt8],
  ['i1', IntTypes.Int8],
  ['u2', IntTypes.UInt16],
  ['i2', IntTypes.Int16],
  ['u4', IntTypes.UInt32],
  ['i4', IntTypes.Int32],
  ['f4', FloatTypes.Float32],
  ['f4', FloatTypes.Float32],
  ['f8', FloatTypes.Float64],
])

export const getComponentType = dtype => {
  const sansEndian = dtype.slice(1)
  return dtypeToComponentType.get(sansEndian)
}

export const testLittleEndian = dtype => dtype.charAt(0) === '<'

const dtypeToGetter = new Map([
  ['b', 'getInt8'],
  ['B', 'getUint8'],
  ['u1', 'getUint8'],
  ['i1', 'getInt8'],
  ['u2', 'getUint16'],
  ['i2', 'getInt16'],
  ['u4', 'getUint32'],
  ['i4', 'getInt32'],
  ['f4', 'getFloat32'],
  ['f8', 'getFloat64'],
])

export const ElementGetter = (dtype, buffer) => {
  const view = new DataView(buffer)
  const size = getSize(dtype)
  const isLittleEndian = testLittleEndian(dtype)
  const type = dtype.slice(1)
  const getter = dtypeToGetter.get(type)

  return index => view[getter](index * size, isLittleEndian)
}

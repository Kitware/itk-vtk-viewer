// Currently missing on Safari
const bigIntArrayType =
  typeof window.BigInt64Array === 'function' ? window.BigInt64Array : Int32Array
const bigUintArrayType =
  typeof window.BigUint64Array === 'function'
    ? window.BigUint64Array
    : Uint32Array

const dtypeToTypedArray = new Map([
  ['<b', Int8Array],
  ['<B', Uint8Array],
  ['<u1', Uint8Array],
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

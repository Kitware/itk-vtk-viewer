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

  ['<f4', Float32Array],
  ['<f8', Float64Array],
])

export default dtypeToTypedArray

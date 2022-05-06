export const CXYZT = Object.freeze(['c', 'x', 'y', 'z', 't']) // viewer indexing

const default1 = (dimMap, ensuredDims) =>
  (ensuredDims ?? Array.from(dimMap.keys())).reduce(
    (map, dim) => map.set(dim, dimMap.get(dim) ?? 1),
    new Map()
  )

const makeDimMap = (dims, array) =>
  new Map(dims.map((dim, i) => [dim, array[i]]))

export const toDimensionMap = (dims, array, minimumDimensions) =>
  default1(makeDimMap(dims, array), minimumDimensions)

export const toDimensionArray = (dims, map) =>
  dims.map(dim => map.get(dim) ?? 1)

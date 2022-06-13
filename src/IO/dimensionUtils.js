export const CXYZT = Object.freeze(['c', 'x', 'y', 'z', 't']) // viewer indexing

export const ensuredDims = (defaultValue, ensuredDims, dimMap) =>
  ensuredDims.reduce(
    (map, dim) => map.set(dim, map.get(dim) ?? defaultValue),
    new Map(dimMap)
  )

export const toDimensionArray = (dims, map) =>
  dims.map(dim => map.get(dim) ?? 1)

export const toDimensionMap = (dims, array) =>
  new Map(dims.map((dim, i) => [dim, array[i]]))

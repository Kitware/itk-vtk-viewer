export const CXYZT = Object.freeze(['c', 'x', 'y', 'z', 't']) // viewer indexing

export const toDimensionMap = (dims, array) =>
  new Map(dims.map((dim, i) => [dim, array[i]]))

export const toDimensionArray = (dims, map) =>
  dims.map(dim => map.get(dim) ?? 1)

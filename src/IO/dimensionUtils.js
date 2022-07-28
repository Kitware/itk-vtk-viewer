export const CXYZT = Object.freeze(['c', 'x', 'y', 'z', 't']) // viewer indexing

export const ensuredDims = (defaultValue, ensuredDims, dimMap) =>
  ensuredDims.reduce(
    (map, dim) => map.set(dim, map.get(dim) ?? defaultValue),
    new Map(dimMap)
  )

export const toDimensionMap = (dims, array) =>
  new Map(dims.map((dim, i) => [dim, array[i]]))

// drops dimensions that are not in dims
export const orderBy = dims => map =>
  new Map(dims.map(dim => [dim, map.get(dim)]))

export const chunkArray = (chunkSize, array) => {
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

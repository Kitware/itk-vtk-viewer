import Matrix from 'itk/Matrix'

import CoordsDecompressor from '../Compression/CoordsDecompressor'

import componentTypeToTypedArray from './componentTypeToTypedArray'

const spatialDims = ['x', 'y', 'z']

/* Every element corresponds to a pyramid level
     Higher levels, corresponds to a higher index, correspond to a lower
     resolution. */
/*
  metadata = [{
    // level 0 metadata
    dims: ['x', 'y'], // Valid elements: 'c', 'x', 'y', 'z', or 't'
    coords: .get() Promise resolves a Map('x': Float64Array([0.0, 2.0, ...), 'y' ...
    numberOfCXYZTChunks: [1, 10, 10, 5, 1], // array shape in chunks
    sizeCXYZTChunks: [1, 64, 64, 64, 1], // chunk shape in elements
    sizeCXYZTElements: [1, 1, 1, 1, 1], // array shape in elements
    name: 'dataset_name'
  },
  {
    // level 1 metadata
    // [...]
  },
    // level N metadata
    // [...]
  ]
  */
class MultiscaleChunkedImage {
  metadata = []

  constructor(metadata, imageType) {
    this.metadata = metadata

    this.imageType = imageType
    this.pixelArrayType = componentTypeToTypedArray.get(imageType.componentType)
    this.spatialDims = ['x', 'y', 'z'].slice(0, imageType.dimension)
    console.log(metadata)
  }

  get topLevel() {
    return this.metadata.length - 1
  }

  async levelOrigin(level) {
    const origin = new Array(this.spatialDims.length)
    const meta = this.metadata[level]
    const coords = await meta.coords.get()
    for (let index = 0; index < this.spatialDims.length; index++) {
      const dim = this.spatialDims[index]
      if (coords.has(dim)) {
        origin[index] = coords.get(dim)[0]
      } else {
        origin[index] = 0.0
      }
    }
    return origin
  }

  async levelSpacing(level) {
    const spacing = new Array(this.spatialDims.length)
    const meta = this.metadata[level]
    const coords = await meta.coords.get()
    for (let index = 0; index < this.spatialDims.length; index++) {
      const dim = this.spatialDims[index]
      if (coords.has(dim)) {
        const coord = coords.get(dim)
        spacing[index] = coord[1] - coord[0]
      } else {
        spacing[index] = 1.0
      }
    }
    return spacing
  }

  get direction() {
    const dimension = this.imageType.dimension
    const direction = new Matrix(dimension, dimension)
    // Direction should be consistent over levels
    const metaDirection = this.metadata[0].direction
    if (!!metaDirection) {
      // Todo: verify this logic
      const dims = this.metadata[0].dims
      for (let d1 = 0; d1 < dimension; d1++) {
        const sd1 = this.spatialDims[d1]
        const di1 = dims.indexOf(sd1)
        for (let d2 = 0; d2 < dimension; d2++) {
          const sd2 = this.spatialDims[d2]
          const di2 = dims.indexOf(sd2)
          direction.setElement(d1, d2, metaDirection[di1][di2])
        }
      }
    } else {
      direction.setIdentity()
    }
    return direction
  }

  /* Return a promise that provides the requested chunk at a given level and
   * chunk index. */
  async getChunks(level, cxyztArray) {
    return this.getChunksImpl(level, cxyztArray)
  }

  async getChunksImpl(level, cxyztArray) {
    console.error('Override me in a derived class')
  }

  /* Retrieve the entire image at the given level. */
  async levelLargestImage(level) {
    const meta = this.metadata[level]

    const chunkSize = meta.sizeCXYZTChunks
    const chunkStrides = [
      chunkSize[0],
      chunkSize[0] * chunkSize[1],
      chunkSize[0] * chunkSize[1] * chunkSize[2],
      chunkSize[0] * chunkSize[1] * chunkSize[2] * chunkSize[3],
    ] // c, x, y, z,

    const size = meta.sizeCXYZTElements.slice(1, 1 + this.imageType.dimension)
    const pixelArray = new this.pixelArrayType(
      size.reduce((a, b) => a * b) * this.imageType.components
    )
    const pixelStrides = [
      this.imageType.components,
      this.imageType.components * size[0],
      this.imageType.components * size[0] * size[1],
      this.imageType.components * size[0] * size[1] * size[2],
    ] // c, x, y, z
    const start = [0, 0, 0, 0] // x, y, z, t
    const end = [
      start[0] + size[0],
      start[1] + size[1],
      start[2] + size[2],
      start[3] + 1,
    ] // x, y, z, t

    const numChunks = meta.numberOfCXYZTChunks
    const l = 0
    const zChunkStart = 0
    const zChunkEnd = numChunks[3]
    const yChunkStart = 0
    const yChunkEnd = numChunks[2]
    const xChunkStart = 0
    const xChunkEnd = numChunks[1]
    const cChunkStart = 0
    const cChunkEnd = numChunks[0]

    const chunkIndices = []
    for (let k = zChunkStart; k < zChunkEnd; k++) {
      for (let j = yChunkStart; j < yChunkEnd; j++) {
        for (let i = xChunkStart; i < xChunkEnd; i++) {
          for (let h = cChunkStart; h < cChunkEnd; h++) {
            chunkIndices.push([h, i, j, k, l])
          } // for every cChunk
        } // for every xChunk
      } // for every yChunk
    } // for every zChunk

    const chunks = await this.getChunks(level, chunkIndices)

    for (let index = 0; index < chunkIndices.length; index++) {
      const chunk = chunks[index]
      const [h, i, j, k, l] = chunkIndices[index]

      const chunkStart = [
        i * chunkSize[1],
        j * chunkSize[2],
        k * chunkSize[3],
        l * chunkSize[4],
      ]
      const chunkEnd = [
        (i + 1) * chunkSize[1],
        (j + 1) * chunkSize[2],
        (k + 1) * chunkSize[3],
        (l + 1) * chunkSize[4],
      ]
      // Skip if the chunk lives outside the region of interest
      if (
        chunkStart[0] > end[0] ||
        chunkEnd[0] < start[0] ||
        chunkStart[1] > end[1] ||
        chunkEnd[1] < start[1] ||
        chunkStart[2] > end[2] ||
        chunkEnd[2] < start[2] ||
        chunkStart[3] > end[3] ||
        chunkEnd[3] < start[3]
      ) {
        // We should never get here...
        console.error('Requested a chunk outside the region of interest!')
      }
      const itStart = [
        Math.max(chunkStart[0], start[0]),
        Math.max(chunkStart[1], start[1]),
        Math.max(chunkStart[2], start[2]),
        Math.max(chunkStart[3], start[3]),
      ]
      const itEnd = [
        Math.min(chunkEnd[0], end[0]),
        Math.min(chunkEnd[1], end[1]),
        Math.min(chunkEnd[2], end[2]),
        Math.min(chunkEnd[3], end[3]),
      ]
      const itChunkOffsets = [0, 0, 0, 0]
      itChunkOffsets[3] = chunkStrides[3] * l
      const itPixelOffsets = [0, 0, 0]
      for (let kk = itStart[2]; kk < itEnd[2]; kk++) {
        itChunkOffsets[2] = chunkStrides[2] * (kk - k * chunkSize[3])
        itPixelOffsets[2] = pixelStrides[2] * (kk - start[2])
        for (let jj = itStart[1]; jj < itEnd[1]; jj++) {
          itChunkOffsets[1] = chunkStrides[1] * (jj - j * chunkSize[2])
          itPixelOffsets[1] = pixelStrides[1] * (jj - start[1])
          for (let ii = itStart[0]; ii < itEnd[0]; ii++) {
            const begin =
              chunkStrides[0] * (itStart[0] - i * chunkSize[1]) +
              itChunkOffsets[1] +
              itChunkOffsets[2] +
              itChunkOffsets[3]
            const end = begin + chunkSize[0] * (itEnd[0] - itStart[0])
            const offset =
              pixelStrides[0] * (itStart[0] - start[0]) +
              itPixelOffsets[1] +
              pixelStrides[2] * (kk - start[2])
            itPixelOffsets[2]
            pixelArray.set(chunk.subarray(begin, end), offset)
          } // for every column
        } // for every row
      } // for every slice
    }

    const origin = await this.levelOrigin(level)
    const spacing = await this.levelSpacing(level)

    const image = {
      imageType: this.imageType,
      name: this.metadata[level].name,
      origin,
      spacing,
      direction: this.direction,
      size,
      data: pixelArray,
    }

    return image
  }

  /* Retrieve the entire image at the top level. */
  async topLevelLargestImage() {
    if (!!this.cachedTopLevelLargestImage) {
      return this.cachedTopLevelLargestImage
    }
    const level = this.topLevel

    this.cachedTopLevelLargestImage = await this.levelLargestImage(level)
    console.log(this.cachedTopLevelLargestImage)

    return this.cachedTopLevelLargestImage
  }
}

export default MultiscaleChunkedImage

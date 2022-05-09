import { setMatrixElement } from 'itk-wasm'

import componentTypeToTypedArray from './componentTypeToTypedArray'

import WebworkerPromise from 'webworker-promise'
import ImageDataFromChunksWorker from './ImageDataFromChunks.worker'
import { CXYZT, toDimensionArray } from './dimensionUtils'
const imageDataFromChunksWorker = new ImageDataFromChunksWorker()
const imageDataFromChunksWorkerPromise = new WebworkerPromise(
  imageDataFromChunksWorker
)

const haveSharedArrayBuffer = typeof window.SharedArrayBuffer === 'function'

/* Every element corresponds to a pyramid scale
     Lower scales, corresponds to a higher index, correspond to a lower
     resolution. 

  scaleInfo = [{
    // scale 0 information
    dims: ['x', 'y'], // Valid elements: 'c', 'x', 'y', 'z', or 't'
    coords: .get() Promise resolves a Map('x': Float64Array([0.0, 2.0, ...), 'y' ...
    chunkCount: Map('t': 1, 'c': 1, 'z': 10, 'y': 10, 'x': 10]), // array shape in chunks
    chunkSize: Map('t': 1, 'c': 1, 'z': 1, 'y': 64, 'x': 64]), // chunk shape in elements
    arrayShape: Map('t': 1, 'c': 1, 'z': 1, 'y': 64, 'x': 64]), // array shape in elements
    ranges: Map('1': [0, 140], '2': [3, 130]) // or null if unknown. Range of values for each component
    name: 'dataset_name'
  },
  {
    // scale 1 information
    // [...]
  },
    // scale N information
    // [...]
  ]
*/

class MultiscaleSpatialImage {
  scaleInfo = []
  name = 'Image'

  constructor(scaleInfo, imageType, name = 'Image') {
    this.scaleInfo = scaleInfo
    this.name = name

    this.imageType = imageType
    this.pixelArrayType = componentTypeToTypedArray.get(imageType.componentType)
    this.spatialDims = ['x', 'y', 'z'].slice(0, imageType.dimension)
    this.cachedScaleLargestImage = new Map()
  }

  get lowestScale() {
    return this.scaleInfo.length - 1
  }

  async scaleOrigin(scale) {
    const origin = new Array(this.spatialDims.length)
    const info = this.scaleInfo[scale]
    for (let index = 0; index < this.spatialDims.length; index++) {
      const dim = this.spatialDims[index]
      if (info.coords.has(dim)) {
        const coords = await info.coords.get(dim)
        origin[index] = coords[0]
      } else {
        origin[index] = 0.0
      }
    }
    return origin
  }

  async scaleSpacing(scale) {
    const spacing = new Array(this.spatialDims.length)
    const info = this.scaleInfo[scale]
    for (let index = 0; index < this.spatialDims.length; index++) {
      const dim = this.spatialDims[index]
      if (info.coords.has(dim)) {
        const coords = await info.coords.get(dim)
        spacing[index] = coords[1] - coords[0]
      } else {
        spacing[index] = 1.0
      }
    }
    return spacing
  }

  get direction() {
    const dimension = this.imageType.dimension
    const direction = new Float64Array(dimension * dimension)
    // Direction should be consistent over scales
    const infoDirection = this.scaleInfo[0].direction
    if (infoDirection) {
      // Todo: verify this logic
      const dims = this.scaleInfo[0].dims
      for (let d1 = 0; d1 < dimension; d1++) {
        const sd1 = this.spatialDims[d1]
        const di1 = dims.indexOf(sd1)
        for (let d2 = 0; d2 < dimension; d2++) {
          const sd2 = this.spatialDims[d2]
          const di2 = dims.indexOf(sd2)
          setMatrixElement(
            direction,
            dimension,
            d1,
            d2,
            infoDirection[di1][di2]
          )
        }
      }
    } else {
      direction.fill(0.0)
      for (let d = 0; d < dimension; d++) {
        setMatrixElement(direction, dimension, d, d, 1.0)
      }
    }
    return direction
  }

  /* Return a promise that provides the requested chunk at a given scale and
   * chunk index. */
  async getChunks(scale, cxyztArray) {
    return this.getChunksImpl(scale, cxyztArray)
  }

  async getChunksImpl(/* scale, cxyztArray */) {
    console.error('Override me in a derived class')
  }

  /* Retrieve the entire image at the given scale. */
  async scaleLargestImage(scale) {
    if (this.cachedScaleLargestImage.has(scale)) {
      return this.cachedScaleLargestImage.get(scale)
    }

    const info = this.scaleInfo[scale]

    const start = new Map(Object.entries({ t: 0, c: 0, z: 0, y: 0, x: 0 }))
    const end = Array.from(start).reduce(
      (end, [dim, startIndex]) =>
        end.set(dim, startIndex + info.arrayShape.get(dim)),
      new Map()
    )

    const numChunks = toDimensionArray(CXYZT, info.chunkCount)
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

    const chunks = await this.getChunks(scale, chunkIndices)

    const transferables = chunks
      .map(chunk => chunk.buffer)
      .filter(
        buffer =>
          // transferables cannot have SharedArrayBuffers
          !haveSharedArrayBuffer || !(buffer instanceof SharedArrayBuffer)
      )

    const args = {
      scaleInfo: {
        chunkSize: info.chunkSize,
        arrayShape: info.arrayShape,
      },
      imageType: this.imageType,
      chunkIndices,
      chunks,
      indexStart: start,
      indexEnd: end,
    }
    const pixelArray = await imageDataFromChunksWorkerPromise.exec(
      'imageDataFromChunks',
      args,
      transferables
    )

    const origin = await this.scaleOrigin(scale)
    const spacing = await this.scaleSpacing(scale)

    const image = {
      imageType: this.imageType,
      name: this.scaleInfo[scale].name,
      origin,
      spacing,
      direction: this.direction,
      size: ['x', 'y', 'z']
        .slice(0, this.imageType.dimension)
        .map(dim => info.arrayShape.get(dim)),
      data: pixelArray,
    }

    this.cachedScaleLargestImage.set(scale, image)
    return image
  }
}

export default MultiscaleSpatialImage

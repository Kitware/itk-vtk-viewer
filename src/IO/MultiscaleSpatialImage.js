import { mat4, vec3 } from 'gl-matrix'
import { setMatrixElement } from 'itk-wasm'

import componentTypeToTypedArray from './componentTypeToTypedArray'

import WebworkerPromise from 'webworker-promise'
import ImageDataFromChunksWorker from './ImageDataFromChunks.worker'
import { chunkArray, CXYZT, ensuredDims, orderBy } from './dimensionUtils'
import { getDtype } from './dtypeUtils'
import { transformBounds } from '../transformBounds'

const imageDataFromChunksWorker = new ImageDataFromChunksWorker()
const imageDataFromChunksWorkerPromise = new WebworkerPromise(
  imageDataFromChunksWorker
)

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
  { scale 1 information },
  { scale N information }
  ]
*/

function inflate(bounds, delta) {
  bounds[0] -= delta
  bounds[1] += delta
  bounds[2] -= delta
  bounds[3] += delta
  bounds[4] -= delta
  bounds[5] += delta
  return bounds
}

// code modfied from vtk.js/ImageData
const extentToBounds = (ex, indexToWorld) => {
  // prettier-ignore
  const corners = [
    ex[0], ex[2], ex[4],
    ex[1], ex[2], ex[4],
    ex[0], ex[3], ex[4],
    ex[1], ex[3], ex[4],
    ex[0], ex[2], ex[5],
    ex[1], ex[2], ex[5],
    ex[0], ex[3], ex[5],
    ex[1], ex[3], ex[5]];

  const idx = new Float64Array([corners[0], corners[1], corners[2]])
  const vout = new Float64Array(3)
  vec3.transformMat4(vout, idx, indexToWorld)
  const bounds = [vout[0], vout[0], vout[1], vout[1], vout[2], vout[2]]
  for (let i = 3; i < 24; i += 3) {
    vec3.set(idx, corners[i], corners[i + 1], corners[i + 2])
    vec3.transformMat4(vout, idx, indexToWorld)
    if (vout[0] < bounds[0]) {
      bounds[0] = vout[0]
    }
    if (vout[1] < bounds[2]) {
      bounds[2] = vout[1]
    }
    if (vout[2] < bounds[4]) {
      bounds[4] = vout[2]
    }
    if (vout[0] > bounds[1]) {
      bounds[1] = vout[0]
    }
    if (vout[1] > bounds[3]) {
      bounds[3] = vout[1]
    }
    if (vout[2] > bounds[5]) {
      bounds[5] = vout[2]
    }
  }

  return bounds
}

const ensure3dDirection = d => {
  if (d.length >= 9) {
    return d
  }
  // Pad 2D with Z dimension
  return [d[0], d[1], 0, d[2], d[3], 0, 0, 0, 1]
}

const makeMat4 = ({ direction, origin, spacing }) => {
  const mat = mat4.create()
  mat4.fromTranslation(mat, origin)

  mat[0] = direction[0]
  mat[1] = direction[1]
  mat[2] = direction[2]
  mat[4] = direction[3]
  mat[5] = direction[4]
  mat[6] = direction[5]
  mat[8] = direction[6]
  mat[9] = direction[7]
  mat[10] = direction[8]

  return mat4.scale(mat, mat, spacing)
}

const makeIndexToWorld = ({ direction: inDirection, origin, spacing }) => {
  const DIMENSIONS = 3
  const direction = [...inDirection]
  for (let idx = 0; idx < DIMENSIONS; ++idx) {
    for (let col = 0; col < DIMENSIONS; ++col) {
      // ITK (and VTKMath) uses row-major index axis, but gl-matrix uses column-major. Transpose.
      direction[col + idx * 3] = direction[idx + col * DIMENSIONS]
    }
  }

  const origin3d = [...origin]
  if (origin3d[2] === undefined) origin3d[2] = 0

  const spacing3d = [...spacing]
  if (spacing3d[2] === undefined) spacing3d[2] = 1

  return makeMat4({ direction, origin: origin3d, spacing: spacing3d })
}

export const worldBoundsToIndexBounds = ({
  bounds,
  fullIndexBounds,
  worldToIndex,
}) => {
  if (!bounds || bounds.length === 0) {
    // no bounds, return full image
    return fullIndexBounds
  }

  const imageBounds = transformBounds(worldToIndex, bounds)
  // clamp to existing integer indexes
  const imageBoundsByDim = chunkArray(2, imageBounds)
  const spaceBounds = ['x', 'y', 'z'].map((dim, idx) => {
    const [min, max] = fullIndexBounds.get(dim)
    const [bmin, bmax] = imageBoundsByDim[idx]
    return [
      dim,
      [
        Math.floor(Math.min(max, Math.max(min, bmin))),
        Math.ceil(Math.min(max, Math.max(min, bmax))),
      ],
    ]
  })
  const ctBounds = ['c', 't'].map(dim => [dim, fullIndexBounds.get(dim)])
  return new Map([...spaceBounds, ...ctBounds])
}

function isContained(benchmarkBounds, testedBounds) {
  return Array.from(benchmarkBounds).every(
    ([dim, [benchmarkMin, benchmarkMax]]) => {
      const [testedMin, testedMax] = testedBounds.get(dim)
      return benchmarkMin <= testedMin && testedMax <= benchmarkMax
    }
  )
}

function findImageInBounds({ cache, scale, bounds }) {
  const imagesAtScale = cache.get(scale) ?? []
  return imagesAtScale.find(({ bounds: cachedBounds }) =>
    isContained(cachedBounds, bounds)
  )?.image
}

export function storeImage({ cache, scale, bounds, image }) {
  cache.set(scale, [{ bounds, image }])
}

class MultiscaleSpatialImage {
  scaleInfo = []
  name = 'Image'

  constructor(scaleInfo, imageType, name = 'Image') {
    this.scaleInfo = scaleInfo
    this.name = name

    this.imageType = imageType
    this.pixelArrayType = componentTypeToTypedArray.get(imageType.componentType)
    this.spatialDims = ['x', 'y', 'z'].slice(0, imageType.dimension)
    this.cachedImages = new Map()
  }

  get lowestScale() {
    return this.scaleInfo.length - 1
  }

  async scaleOrigin(scale) {
    const info = this.scaleInfo[scale]
    if (info.origin) return info.origin

    const origin = new Array(this.spatialDims.length)
    for (let index = 0; index < this.spatialDims.length; index++) {
      const dim = this.spatialDims[index]
      if (info.coords.has(dim)) {
        const coords = await info.coords.get(dim)
        origin[index] = coords[0]
      } else {
        origin[index] = 0.0
      }
    }
    info.origin = origin
    return origin
  }

  async scaleSpacing(scale) {
    const info = this.scaleInfo[scale]
    if (info.spacing) return info.spacing

    const spacing = new Array(this.spatialDims.length)
    for (let index = 0; index < this.spatialDims.length; index++) {
      const dim = this.spatialDims[index]
      if (info.coords.has(dim)) {
        const coords = await info.coords.get(dim)
        spacing[index] = coords[1] - coords[0]
      } else {
        spacing[index] = 1.0
      }
    }
    info.spacing = spacing
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

  async buildImage(scale, indexBounds) {
    const { chunkSize, chunkCount, pixelArrayMetadata } = this.scaleInfo[scale]
    const [indexToWorld, spacing] = await Promise.all([
      this.scaleIndexToWorld(scale),
      this.scaleSpacing(scale),
    ])

    const start = new Map(
      CXYZT.map(dim => [dim, indexBounds.get(dim)?.[0] ?? 0])
    )
    const end = new Map(
      CXYZT.map(dim => [dim, (indexBounds.get(dim)?.[1] ?? 0) + 1])
    )

    const arrayShape = new Map(
      CXYZT.map(dim => [dim, end.get(dim) - start.get(dim)])
    )

    const startXYZ = ['x', 'y', 'z'].map(dim => start.get(dim))
    const origin = vec3
      .transformMat4([], startXYZ, indexToWorld)
      .slice(0, this.imageType.dimension)

    const chunkSizeWith1 = ensuredDims(1, CXYZT, chunkSize)
    const l = 0
    const zChunkStart = Math.floor(start.get('z') / chunkSizeWith1.get('z'))
    const zChunkEnd = Math.ceil(end.get('z') / chunkSizeWith1.get('z'))
    const yChunkStart = Math.floor(start.get('y') / chunkSizeWith1.get('y'))
    const yChunkEnd = Math.ceil(end.get('y') / chunkSizeWith1.get('y'))
    const xChunkStart = Math.floor(start.get('x') / chunkSizeWith1.get('x'))
    const xChunkEnd = Math.ceil(end.get('x') / chunkSizeWith1.get('x'))
    const cChunkStart = 0
    const cChunkEnd = chunkCount.get('c') ?? 1

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

    const args = {
      scaleInfo: {
        chunkSize: chunkSizeWith1,
        arrayShape,
        dtype: pixelArrayMetadata?.dtype ?? getDtype(this.pixelArrayType),
      },
      imageType: this.imageType,
      chunkIndices,
      chunks,
      indexStart: start,
      indexEnd: end,
    }
    const pixelArray = await imageDataFromChunksWorkerPromise.exec(
      'imageDataFromChunks',
      args
    )

    return {
      imageType: this.imageType,
      name: this.scaleInfo[scale].name,
      origin,
      spacing,
      direction: this.direction,
      size: ['x', 'y', 'z']
        .slice(0, this.imageType.dimension)
        .map(dim => arrayShape.get(dim)),
      data: pixelArray,
    }
  }

  async scaleIndexToWorld(scale) {
    if (this.scaleInfo[scale].indexToWorld)
      return this.scaleInfo[scale].indexToWorld

    // compute and cache origin/scale on info
    await Promise.all([this.scaleOrigin(scale), this.scaleSpacing(scale)])

    const { spacing, origin } = this.scaleInfo[scale]
    const direction = ensure3dDirection(this.direction)

    this.scaleInfo[scale].indexToWorld = makeIndexToWorld({
      direction,
      origin,
      spacing,
    })
    return this.scaleInfo[scale].indexToWorld
  }

  /* Retrieve bounded image at scale. */
  async getImage(scale, worldBounds = []) {
    const indexToWorld = await this.scaleIndexToWorld(scale)

    const { dims } = this.scaleInfo[scale]
    const fullIndexBounds = ensuredDims(
      [0, 1],
      CXYZT,
      this.getIndexBounds(scale)
    )
    const indexBounds = orderBy(dims)(
      worldBoundsToIndexBounds({
        bounds: worldBounds,
        fullIndexBounds,
        worldToIndex: mat4.invert([], indexToWorld),
      })
    )

    const cachedImage = findImageInBounds({
      cache: this.cachedImages,
      scale,
      bounds: indexBounds,
    })
    if (cachedImage) return cachedImage

    const image = await this.buildImage(scale, indexBounds)
    storeImage({ cache: this.cachedImages, scale, bounds: indexBounds, image })
    return image
  }

  getIndexBounds(scale) {
    const { arrayShape } = this.scaleInfo[scale]
    return new Map(
      Array.from(arrayShape).map(([dim, size]) => [dim, [0, size - 1]])
    )
  }

  // indexToWorld will be undefined if getImage() not completed on scale first
  getWorldBounds(scale) {
    const { indexToWorld } = this.scaleInfo[scale]
    const imageBounds = ensuredDims(
      [0, 1],
      ['x', 'y', 'z'],
      this.getIndexBounds(scale)
    )
    const bounds = ['x', 'y', 'z'].flatMap(dim => imageBounds.get(dim))
    inflate(bounds, 0.5)
    return extentToBounds(bounds, indexToWorld)
  }
}

export default MultiscaleSpatialImage

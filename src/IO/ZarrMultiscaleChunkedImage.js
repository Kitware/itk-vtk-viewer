import axios from 'axios'

import PixelTypes from 'itk/PixelTypes'
import IntTypes from 'itk/IntTypes'
import FloatTypes from 'itk/FloatTypes'

import MultiscaleChunkedImage from './MultiscaleChunkedImage'
import bloscZarrDecompress from '../Compression/bloscZarrDecompress'
import CoordsDecompressor from '../Compression/CoordsDecompressor'

const dtypeToComponentType = new Map([
  ['<b', IntTypes.Int8],
  ['<B', IntTypes.UInt8],
  ['<u1', IntTypes.UInt8],
  ['|u1', IntTypes.UInt8],
  ['<i1', IntTypes.Int8],
  ['|i1', IntTypes.Int8],
  ['<u2', IntTypes.UInt16],
  ['<i2', IntTypes.Int16],
  ['<u4', IntTypes.UInt32],
  ['<i4', IntTypes.Int32],

  ['<f4', FloatTypes.Float32],
  ['<f8', FloatTypes.Float64],
])

const spatialDimsSet = new Set(['x', 'y', 'z'])

function setIntersection(setA, setB) {
  let _intersection = new Set()
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}

class LazyCoords {
  constructor(store, scaleInfoCoordsPaths) {
    this.decompressor = new CoordsDecompressor(store, scaleInfoCoordsPaths)
    this.coords = new Map()
    for (const coord of scaleInfoCoordsPaths.keys()) {
      this.coords.set(coord, null)
    }
  }

  async get(coord) {
    if (this.coords.get(coord) === null) {
      const result = await this.decompressor.getCoord(coord)
      this.coords.set(coord, result)
      return result
    }
    return this.coords.get(coord)
  }

  has(coord) {
    return this.coords.has(coord)
  }
}

class ZarrMultiscaleChunkedImage extends MultiscaleChunkedImage {
  // Constructor cannot be async
  /*
    scaleInfo = [{
      arrayMetadata: {
      }
    }]
    */
  static async extractScaleInfo(store) {
    let bottomScaleInfo = {
      dims: [],
      coords: new Map(),
      numberOfCXYZTChunks: [1, 1, 1, 1, 1],
      sizeCXYZTChunks: [1, 1, 1, 1, 1],
      sizeCXYZTElements: [1, 1, 1, 1, 1],
    }
    const zattrs = await store.getItem('.zattrs')
    const multiscales = zattrs.multiscales
    const name = multiscales[0]['name']
    const datasets = multiscales[0].datasets

    async function extractSingleScaleInfo(scalePath) {
      const info = {
        dims: [],
        coords: new Map(),
        numberOfCXYZTChunks: [1, 1, 1, 1, 1],
        sizeCXYZTChunks: [1, 1, 1, 1, 1],
        sizeCXYZTElements: [1, 1, 1, 1, 1],
      }

      const pixelArrayAttrsPath = `${scalePath}/.zattrs`
      const pixelArrayAttrs = await store.getItem(pixelArrayAttrsPath)
      const arrayDims = pixelArrayAttrs._ARRAY_DIMENSIONS || []
      info.dims = arrayDims
      if (!!pixelArrayAttrs.direction) {
        info.direction = pixelArrayAttrs.direction
      }
      const pixelArrayMetaPath = `${scalePath}/.zarray`
      const pixelArrayMeta = await store.getItem(pixelArrayMetaPath)
      info.pixelArrayMetadata = pixelArrayMeta
      info.name = name
      info.pixelArrayPath = scalePath

      const coordsPrefixIndex = scalePath.lastIndexOf('/')
      const coordsPrefix = scalePath.substring(0, coordsPrefixIndex)
      for (const coord of ['c', 'x', 'y', 'z', 't']) {
        const containsArray = await store.containsItem(
          `${coordsPrefix}/${coord}/.zarray`
        )
        if (containsArray) {
          info.coords.set(coord, null)
        }
      }

      const scaleInfoCoordPaths = new Map()
      info.coords.forEach((value, key) => {
        scaleInfoCoordPaths.set(key, `${coordsPrefix}/${key}`)
      })
      info.coords = new LazyCoords(store, scaleInfoCoordPaths)
      if (info.dims.length === 0) {
        const dimension = info.pixelArrayMetadata.shape.length
        info.dims = ['t', 'c', 'z', 'y', 'x'].slice(5 - dimension)
      }

      return info
    }

    const scaleInfoPromises = datasets.map(dataset => {
      return extractSingleScaleInfo(dataset.path)
    })
    const scaleInfo = await Promise.all(scaleInfoPromises)

    const info = scaleInfo[scaleInfo.length - 1]
    const dimension = setIntersection(new Set(info.dims), spatialDimsSet).size

    let pixelType = PixelTypes.Scalar
    const dtype = info.pixelArrayMetadata.dtype
    let components = 1
    if (info.coords.has('c')) {
      const componentValues = await info.coords.get('c')
      components = componentValues.length
      if (dtype.includes('u1')) {
        switch (components) {
          case 3:
            pixelType = PixelTypes.RGB
            break
          case 4:
            pixelType = PixelTypes.RGBA
            break
          default:
            pixelType = PixelTypes.VariableLengthVector
        }
      } else {
        pixelType = PixelTypes.VariableLengthVector
      }
    } // Todo: add support for more pixel types
    const componentType = dtypeToComponentType.get(dtype)

    const imageType = {
      dimension,
      pixelType,
      componentType,
      components,
    }

    return { scaleInfo, imageType }
  }

  // Call extractScaleInfo to retrieve scaleInfo, imageType
  constructor(store, scaleInfo, imageType) {
    scaleInfo.forEach(info => {
      ;['c', 'x', 'y', 'z', 't'].forEach((dim, chunkIndex) => {
        const index = info.dims.indexOf(dim)
        if (index !== -1) {
          info.numberOfCXYZTChunks[chunkIndex] = Math.ceil(
            info.pixelArrayMetadata.shape[index] /
              info.pixelArrayMetadata.chunks[index]
          )
          info.sizeCXYZTChunks[chunkIndex] =
            info.pixelArrayMetadata.chunks[index]
          info.sizeCXYZTElements[chunkIndex] =
            info.pixelArrayMetadata.shape[index]
        }
      })
    })
    super(scaleInfo, imageType)
    this.store = store
    // utility
    this.CXYZT = ['c', 'x', 'y', 'z', 't']
  }

  async getChunksImpl(scale, cxyztArray) {
    const info = this.scaleInfo[scale]
    const chunkPathBase = info.pixelArrayPath
    const chunkPaths = []
    const chunkPromises = []
    for (let index = 0; index < cxyztArray.length; index++) {
      let chunkPath = `${chunkPathBase}/`
      for (let dd = 0; dd < info.dims.length; dd++) {
        const dim = info.dims[dd]
        chunkPath = `${chunkPath}${cxyztArray[index][this.CXYZT.indexOf(dim)]}.`
      }
      chunkPath = chunkPath.slice(0, -1)
      chunkPaths.push(chunkPath)
      chunkPromises.push(this.store.getItem(chunkPath))
    }
    const compressedChunks = await Promise.all(chunkPromises)
    const toDecompress = []
    for (let index = 0; index < compressedChunks.length; index++) {
      toDecompress.push({
        data: compressedChunks[index],
        metadata: info.pixelArrayMetadata,
      })
    }

    return bloscZarrDecompress(toDecompress)
  }
}

export default ZarrMultiscaleChunkedImage

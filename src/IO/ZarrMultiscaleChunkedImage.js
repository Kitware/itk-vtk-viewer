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

class ZarrMultiscaleChunkedImage extends MultiscaleChunkedImage {
  url

  // Call parseMetadata to retrieve metadata
  constructor(url, metadata) {
    const meta = metadata[0]
    const dimension = meta.pixelArrayMetadata.shape.length

    let pixelType = PixelTypes.Scalar
    const dtype = meta.pixelArrayMetadata.dtype
    if (dtype.includes('u1') && meta.coords.has('c')) {
      switch (meta.coords.get('c').length) {
        case 3:
          pixelType = PixelTypes.RGB
          break
        case 4:
          pixelType = PixelTypes.RGBA
          break
        default:
          pixelType = PixelTypes.VariableLengthVector
      }
    } else if (meta.coords.has('c')) {
      pixelType = PixelTypes.VariableLengthVector
    } // Todo: add support for more pixel types
    const componentType = dtypeToComponentType.get(dtype)
    let components = 1
    if (meta.coords.has('c')) {
      components = meta.coords.get('c').length
    }

    const imageType = {
      dimension,
      pixelType,
      componentType,
      components,
    }

    super(metadata, imageType)
    this.url = url
    // utilitiy
    this.CXYZT = ['c', 'x', 'y', 'z', 't']
  }

  // Constructor cannot be async
  static async parseMetadata(url) {
    const metadataUrl = url + '/.zmetadata'
    const response = await axios.get(metadataUrl, { responseType: 'json' })
    const zmetadata = response.data.metadata
    let bottomMeta = {
      dims: [],
      coords: new Map(),
      numberOfCXYZTChunks: [1, 1, 1, 1, 1],
      sizeCXYZTChunks: [1, 1, 1, 1, 1],
      sizeCXYZTElements: [1, 1, 1, 1, 1],
    }
    const multiscaleLevels =
      zmetadata['.zattrs']._MULTISCALE_LEVELS !== undefined
        ? zmetadata['.zattrs']._MULTISCALE_LEVELS
        : ['']
    let pixelArrayName =
      zmetadata['.zattrs']._SPATIAL_IMAGE !== undefined
        ? zmetadata['.zattrs']._SPATIAL_IMAGE
        : null
    if (pixelArrayName !== null) {
      const pixelArrayAttrs =
        multiscaleLevels[0] === ''
          ? `${pixelArrayName}/.zattrs`
          : `${multiscaleLevels[0]}/${pixelArrayName}/.zattrs`
      const arrayDims = zmetadata[pixelArrayAttrs]._ARRAY_DIMENSIONS || []
      bottomMeta.dims = arrayDims
      if (!!zmetadata[pixelArrayAttrs].direction) {
        bottomMeta.direction = zmetadata[pixelArrayAttrs].direction
      }
      const pixelArrayMeta =
        multiscaleLevels[0] === ''
          ? `${pixelArrayName}/.zarray`
          : `${multiscaleLevels[0]}/${pixelArrayName}/.zarray}`
      bottomMeta.pixelArrayMetadata = zmetadata[pixelArrayMeta]
      bottomMeta.pixelArrayName = pixelArrayName
      bottomMeta.pixelArrayUrl =
        multiscaleLevels[0] === ''
          ? `${url}/${bottomMeta.pixelArrayName}/`
          : `${url}/${multiscaleLevels[0]}/${bottomMeta.pixelArrayName}/`

      const coordPrefix =
        multiscaleLevels[0] === '' ? '' : `${multiscaleLevels[0]}/`
      ;['x', 'y', 'z', 'c', 't'].forEach(coord => {
        const arrayAttr = `${coordPrefix}${coord}/.zarray`
        if (zmetadata[arrayAttr] !== undefined) {
          bottomMeta.coords.set(coord, null)
        }
      })
    } else {
      for (let obj in zmetadata) {
        // Assume the pixel buffer array will have the most dimensions
        // And by a top level array
        const arrayDims = zmetadata[obj]._ARRAY_DIMENSIONS || []
        const slashCount = obj.split('/').length
        if (arrayDims.length > bottomMeta.dims.length && slashCount < 3) {
          bottomMeta.dims = arrayDims
          if (!!zmetadata[obj].direction) {
            bottomMeta.direction = zmetadata[obj].direction
          }
          const pixelArrayName = obj.replace('.zattrs', '.zarray')
          bottomMeta.pixelArrayMetadata = zmetadata[pixelArrayName]
          bottomMeta.pixelArrayName = pixelArrayName.replace('/.zarray', '')
          bottomMeta.pixelArrayUrl = `${url}/${bottomMeta.pixelArrayName}/`
        }

        if (obj.match(/^[xyzct]\/.zarray/) !== null) {
          const coord = obj[0]
          bottomMeta.coords.set(coord, null)
        }
      }
    }
    pixelArrayName = bottomMeta.pixelArrayName
    const bottomMetaCoordPaths = new Map()
    bottomMeta.coords.forEach((value, key) => {
      const coordPrefix =
        multiscaleLevels[0] === '' ? '' : `${multiscaleLevels[0]}/`
      bottomMetaCoordPaths.set(key, `${coordPrefix}${key}`)
    })
    bottomMeta.coords = new CoordsDecompressor(
      url,
      zmetadata,
      bottomMetaCoordPaths
    )
    bottomMeta.coords = await bottomMeta.coords.getCoords()
    if (bottomMeta.dims.length === 0) {
      const dimension = bottomMeta.pixelArrayMetadata.shape.length
      bottomMeta.dims = ['z', 'y', 'x'].slice(3 - dimension)
    }

    async function levelMetadata(levelPath) {
      const meta = {
        dims: [],
        coords: new Map(),
        numberOfCXYZTChunks: [1, 1, 1, 1, 1],
        sizeCXYZTChunks: [1, 1, 1, 1, 1],
        sizeCXYZTElements: [1, 1, 1, 1, 1],
      }

      const pixelArrayAttrs = `${levelPath}/${pixelArrayName}/.zattrs`
      const arrayDims = zmetadata[pixelArrayAttrs]._ARRAY_DIMENSIONS || []
      meta.dims = arrayDims
      if (!!zmetadata[pixelArrayAttrs].direction) {
        meta.direction = zmetadata[pixelArrayAttrs].direction
      }
      const pixelArrayMeta = `${levelPath}/${pixelArrayName}/.zarray`
      meta.pixelArrayMetadata = zmetadata[pixelArrayMeta]
      meta.pixelArrayName = pixelArrayName
      meta.pixelArrayUrl = `${url}/${levelPath}/${pixelArrayName}/`

      const coordPrefix = `${levelPath}/`
      ;['x', 'y', 'z', 'c', 't'].forEach(coord => {
        const arrayAttr = `${coordPrefix}${coord}/.zarray`
        if (zmetadata[arrayAttr] !== undefined) {
          meta.coords.set(coord, null)
        }
      })

      const metaCoordPaths = new Map()
      meta.coords.forEach((value, key) => {
        metaCoordPaths.set(key, `${levelPath}/${key}`)
      })
      meta.coords = new CoordsDecompressor(url, zmetadata, metaCoordPaths)
      if (meta.dims.length === 0) {
        const dimension = meta.pixelArrayMetadata.shape.length
        meta.dims = ['z', 'y', 'x'].slice(3 - dimension)
      }

      return meta
    }

    const metadata = new Array(multiscaleLevels.length)
    metadata[0] = bottomMeta
    if (multiscaleLevels.length > 1) {
      const levelPromises = new Array(multiscaleLevels.length - 1)
      for (let level = 1; level < multiscaleLevels.length; level++) {
        levelPromises[level - 1] = levelMetadata(multiscaleLevels[level])
      }
      const resolved = await Promise.all(levelPromises)
      for (let level = 1; level < multiscaleLevels.length; level++) {
        metadata[level] = resolved[level - 1]
      }
    } else {
      // Check for default multi-scale level names
      const level = 1
      let levelZAttrs = `level_${level}.zarr/${pixelArrayName}/.zattrs`
      while (zmetadata[levelZAttrs] !== undefined) {
        const meta = await levelMetadata(`level_${level}.zarr`)
        metadata.push(meta)
        level++
        levelZAttrs = `level_${level}.zarr/${pixelArrayName}/.zattrs`
      }
    }

    return metadata
  }

  async getChunksImpl(level, cxyztArray) {
    const meta = this.metadata[level]
    const chunkUrlBase = meta.pixelArrayUrl
    const chunkUrls = []
    const chunkUrlPromises = []
    for (let index = 0; index < cxyztArray.length; index++) {
      let chunkUrl = chunkUrlBase
      for (let dd = 0; dd < meta.dims.length; dd++) {
        const dim = meta.dims[dd]
        chunkUrl = `${chunkUrl}${cxyztArray[index][this.CXYZT.indexOf(dim)]}.`
      }
      chunkUrl = chunkUrl.slice(0, -1)
      console.log(chunkUrl)
      chunkUrls.push(chunkUrl)
      chunkUrlPromises.push(
        axios.get(chunkUrl, { responseType: 'arraybuffer' })
      )
    }
    const chunkResponses = await Promise.all(chunkUrlPromises)
    const toDecompress = []
    for (let index = 0; index < chunkResponses.length; index++) {
      toDecompress.push({
        data: chunkResponses[index].data,
        metadata: meta.pixelArrayMetadata,
      })
    }

    return bloscZarrDecompress(toDecompress)
  }
}

export default ZarrMultiscaleChunkedImage

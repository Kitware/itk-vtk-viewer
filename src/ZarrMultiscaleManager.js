import axios from 'axios'

import MultiscaleManager from './MultiscaleManager'
import bloscZarrDecompress from './bloscZarrDecompress'

async function decompressCoordPromise(url, zmetadata, coordPath) {
  const chunkUrl = `${url}/${coordPath}/0`
  const response = await axios.get(chunkUrl, { responseType: 'arraybuffer' })
  const compressedChunk = response.data
  const zarrayMetadata = zmetadata[`${coordPath}/.zarray`]
  const chunk = bloscZarrDecompress(compressedChunk, zarrayMetadata)
  return chunk
}

class ZarrMultiscaleManager extends MultiscaleManager {
  url

  // Call parseMetadata to retrieve metadata
  constructor(url, metadata) {
    super(metadata)
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
          bottomMeta.pixelArrayMetadata = zbottomMeta[pixelArrayName]
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
    bottomMeta.coords.forEach((value, key) => {
      const coordPrefix =
        multiscaleLevels[0] === '' ? '' : `${multiscaleLevels[0]}/`
      bottomMeta.coords.set(
        key,
        decompressCoordPromise(url, zmetadata, `${coordPrefix}${key}`)
      )
    })
    // We need this earlier and it is small -- resolve it now.
    if (bottomMeta.coords.has('c')) {
      bottomMeta.coords.set('c', await meta.coords.get('c'))
    }
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

      meta.coords.forEach((value, key) => {
        meta.coords.set(
          key,
          decompressCoordPromise(url, zmetadata, `${levelPath}/${key}`)
        )
      })
      // We need this earlier and it is small -- resolve it now.
      if (meta.coords.has('c')) {
        meta.coords.set('c', await meta.coords.get('c'))
      }
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
      while (zmetdata[levelZAttrs] !== undefined) {
        const meta = await levelMetadata(`level_${level}.zarr`)
        metadata.push(meta)
        level++
        levelZAttrs = `level_${level}.zarr/${pixelArrayName}/.zattrs`
      }
    }

    return metadata
  }

  async getChunkImpl(level, cxyzt) {
    const meta = this.metadata[level]
    let chunkUrl = meta.pixelArrayUrl

    meta.dims.forEach(dim => {
      chunkUrl = `${chunkUrl}${cxyzt[this.CXYZT.indexOf(dim)]}.`
    })
    chunkUrl = chunkUrl.slice(0, -1)
    console.log(chunkUrl)
    const response = await axios.get(chunkUrl, { responseType: 'arraybuffer' })
    const compressedChunk = response.data
    return bloscZarrDecompress(compressedChunk, meta.pixelArrayMetadata)
  }
}

export default ZarrMultiscaleManager

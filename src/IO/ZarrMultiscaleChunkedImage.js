import { PixelTypes, IntTypes, FloatTypes } from 'itk-wasm'

import MultiscaleChunkedImage from './MultiscaleChunkedImage'
import bloscZarrDecompress from '../Compression/bloscZarrDecompress'
import ZarrStore from './ZarrStore'

export const isZarr = url => /\.zarr(\/0)?$/.test(url)

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

const getScaleTransform = metadata => {
  const { coordinateTransformations } = metadata
  return coordinateTransformations
    ? coordinateTransformations[0].scale
    : [1, 1, 1, 1, 1]
}

const extractDatasetScaleInfo = (
  store,
  zattrs,
  multiscaleImage
) => async dataset => {
  const { path: scalePath } = dataset

  const dims = multiscaleImage.axes.map(({ name }) => name)

  const pixelArrayMetadata = await store.getItem(`${scalePath}/.zarray`)

  // calculate voxel/pixel positions
  const imageScale = getScaleTransform(multiscaleImage)
  const datasetScale = getScaleTransform(dataset)
  const { shape } = pixelArrayMetadata

  const coords = dims
    .map((dim, dimIdx) => ({
      // Zip dim with shape and transformations
      dim,
      spacing: imageScale[dimIdx] * datasetScale[dimIdx],
      size: shape[dimIdx],
    }))
    .map(({ dim, spacing, size }) => {
      // calculate coords for each voxel/pixel/time
      const coordsPerElement = new Float32Array(size)
      const origin = spatialDimsSet.has(dim) ? spacing / 2 : 0 // translate transformations not implemented
      coordsPerElement.forEach(
        (_, i) => (coordsPerElement[i] = origin + i * spacing)
      )
      return { dim, coordsPerElement }
    })
    .reduce(
      (coords, { dim, coordsPerElement }) => coords.set(dim, coordsPerElement),
      new Map()
    )

  const info = {
    dims,
    pixelArrayMetadata,
    name: multiscaleImage.name,
    pixelArrayPath: scalePath,
    coords,
    numberOfCXYZTChunks: [1, 1, 1, 1, 1],
    sizeCXYZTChunks: [1, 1, 1, 1, 1],
    sizeCXYZTElements: [1, 1, 1, 1, 1],
    ranges: zattrs.ranges ?? undefined,
    direction: zattrs.direction ?? undefined,
  }
  return info
}

const extractScaleInfo = async store => {
  const zattrs = await store.getItem('.zattrs')

  const { multiscales } = zattrs
  const multiscaleImage = Array.isArray(multiscales)
    ? multiscales[0] // if multiple images (multiscales), just grab first one
    : multiscales

  const extractScale = extractDatasetScaleInfo(store, zattrs, multiscaleImage)
  const scaleInfo = await Promise.all(
    multiscaleImage.datasets.map(extractScale)
  )

  const info = scaleInfo[scaleInfo.length - 1]
  const dimension = setIntersection(new Set(info.dims), spatialDimsSet).size

  let pixelType = PixelTypes.Scalar
  const dtype = info.pixelArrayMetadata.dtype
  const componentType = dtypeToComponentType.get(dtype)
  let components = 1
  // if (info.coords.has('c')) {
  //   const componentValues = await info.coords.get('c')
  //   components = componentValues.length
  //   if (dtype.includes('u1')) {
  //     switch (components) {
  //       case 3:
  //         pixelType = PixelTypes.RGB
  //         break
  //       case 4:
  //         pixelType = PixelTypes.RGBA
  //         break
  //       default:
  //         pixelType = PixelTypes.VariableLengthVector
  //     }
  //   } else {
  //     pixelType = PixelTypes.VariableLengthVector
  //   }
  // } // Todo: add support for more pixel types

  const imageType = {
    dimension,
    pixelType,
    componentType,
    components,
  }

  return { scaleInfo, imageType }
}

class ZarrMultiscaleChunkedImage extends MultiscaleChunkedImage {
  static async fromStore(store) {
    const { scaleInfo, imageType } = await extractScaleInfo(store)
    return new ZarrMultiscaleChunkedImage(store, scaleInfo, imageType)
  }

  static async fromUrl(url) {
    return ZarrMultiscaleChunkedImage.fromStore(new ZarrStore(url))
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
        chunkPath = `${chunkPath}${cxyztArray[index][this.CXYZT.indexOf(dim)]}/`
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

import { PixelTypes, IntTypes, FloatTypes } from 'itk-wasm'

import MultiscaleChunkedImage from './MultiscaleChunkedImage'
import bloscZarrDecompress from '../Compression/bloscZarrDecompress'
import ZarrStore from './ZarrStore'
import HttpStore from './HttpStore'

// ends with zarr and optional nested image name like foo.zarr/image1
export const isZarr = url => /zarr((\/)[\w-]+\/?)?$/.test(url)

const dtypeToComponentType = new Map([
  ['<b', IntTypes.Int8],
  ['<B', IntTypes.UInt8],
  ['<u1', IntTypes.UInt8],
  ['>u1', IntTypes.UInt8],
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

const CXYZT = ['c', 'x', 'y', 'z', 't']
const TCZXY = ['t', 'c', 'z', 'x', 'y']

const getScaleTransform = metadata => {
  const { coordinateTransformations } = metadata
  return coordinateTransformations
    ? coordinateTransformations[0].scale
    : [1, 1, 1, 1, 1]
}

const computeScaleSpacing = ({
  zattrs,
  multiscaleImage,
  pixelArrayMetadata,
  dataset,
}) => {
  const dims = multiscaleImage.axes?.map(({ name }) => name) ?? TCZXY

  // calculate voxel/pixel positions
  const imageScale = getScaleTransform(multiscaleImage)
  const datasetScale = getScaleTransform(dataset)
  const { shape, chunks } = pixelArrayMetadata

  const coords = dims
    .map((dim, dimIdx) => ({
      // Zip dim with shape and transformations
      dim,
      spacing: imageScale[dimIdx] * datasetScale[dimIdx],
      origin: 0, // translate transformations not implemented
      size: shape[dimIdx],
    }))
    .map(({ dim, spacing, origin, size }) => {
      // calculate coords for each voxel/pixel/time
      const coordsPerElement = new Float32Array(size)
      for (let i = 0; i < coordsPerElement.length; i++) {
        coordsPerElement[i] = origin + i * spacing
      }
      return { dim, coordsPerElement }
    })
    .reduce(
      (coords, { dim, coordsPerElement }) => coords.set(dim, coordsPerElement),
      new Map()
    )

  const numberOfCXYZTChunks = [1, 1, 1, 1, 1]
  const sizeCXYZTChunks = [1, 1, 1, 1, 1]
  const sizeCXYZTElements = [1, 1, 1, 1, 1]
  CXYZT.forEach((dim, chunkIndex) => {
    const index = dims.indexOf(dim)
    if (index !== -1) {
      numberOfCXYZTChunks[chunkIndex] = Math.ceil(shape[index] / chunks[index])
      sizeCXYZTChunks[chunkIndex] = chunks[index]
      sizeCXYZTElements[chunkIndex] = shape[index]
    }
  })

  return {
    dims,
    pixelArrayMetadata,
    name: multiscaleImage.name,
    pixelArrayPath: dataset.path,
    coords,
    ranges: zattrs.ranges ?? undefined,
    direction: zattrs.direction ?? undefined,
    numberOfCXYZTChunks,
    sizeCXYZTChunks,
    sizeCXYZTElements,
  }
}

const extractScaleSpacing = async store => {
  const zattrs = await store.getItem('.zattrs')

  const { multiscales } = zattrs
  const multiscaleImage = Array.isArray(multiscales)
    ? multiscales[0] // if multiple images (multiscales), just grab first one
    : multiscales

  const scaleInfo = await Promise.all(
    multiscaleImage.datasets.map(async dataset => {
      const pixelArrayMetadata = await store.getItem(`${dataset.path}/.zarray`)
      return computeScaleSpacing({
        zattrs,
        multiscaleImage,
        pixelArrayMetadata,
        dataset,
      })
    })
  )

  const info = scaleInfo[0]
  // How many spatial dimensions?  Count non 1 X, Y, Z elements as "axis" metadata not defined in V0.1
  const dimension = info.sizeCXYZTElements.slice(1, 4).filter(dim => dim > 1)
    .length

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
  // Store parameter is object with getItem, but not a ZarrStore
  static async fromStore(store) {
    const zarrStore = new ZarrStore(store)
    const { scaleInfo, imageType } = await extractScaleSpacing(zarrStore)
    return new ZarrMultiscaleChunkedImage(zarrStore, scaleInfo, imageType)
  }

  static async fromUrl(url) {
    return ZarrMultiscaleChunkedImage.fromStore(new HttpStore(url))
  }

  // Use static factory functions to construct
  constructor(zarrStore, scaleInfo, imageType) {
    super(scaleInfo, imageType)
    this.store = zarrStore
  }

  async getChunksImpl(scale, cxyztArray) {
    const info = this.scaleInfo[scale]
    const chunkPathBase = info.pixelArrayPath
    const chunkPaths = []
    const chunkPromises = []

    const { dimension_separator: dimSeparator } = info.pixelArrayMetadata

    for (let index = 0; index < cxyztArray.length; index++) {
      let chunkPath = `${chunkPathBase}/`
      for (let dd = 0; dd < info.dims.length; dd++) {
        const dim = info.dims[dd]
        chunkPath = `${chunkPath}${
          cxyztArray[index][CXYZT.indexOf(dim)]
        }${dimSeparator}`
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

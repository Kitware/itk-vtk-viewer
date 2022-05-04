import { PixelTypes, IntTypes, FloatTypes } from 'itk-wasm'

import MultiscaleSpatialImage from './MultiscaleSpatialImage'
import bloscZarrDecompress from '../Compression/bloscZarrDecompress'
import ZarrStore from './ZarrStore'
import HttpStore from './HttpStore'
import { CXYZT, toDimensionArray, toDimensionMap } from './dimensionUtils'

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

const CONTIGUOUS_CHANNEL_INDEXING = Object.freeze(['t', 'c', 'z', 'y', 'x'])

const composeTransforms = (transforms = [], dimCount) =>
  transforms.reduce(
    ({ scale, translation }, transform) => {
      if (transform.type === 'scale') {
        const scaleTransform = transform.scale
        return {
          scale: scale.map((s, i) => s * scaleTransform[i]),
          translation: translation.map((t, i) => t * scaleTransform[i]),
        }
      } else if (transform.type === 'translation') {
        const translationTransform = transform.translation
        return {
          scale,
          translation: translation.map((t, i) => t + translationTransform[i]),
        }
      }
    },
    { scale: Array(dimCount).fill(1), translation: Array(dimCount).fill(0) }
  )

export const computeTransform = (imageMetadata, datasetMetadata, dimCount) => {
  const global = composeTransforms(
    imageMetadata.coordinateTransformations,
    dimCount
  )
  const dataset = composeTransforms(
    datasetMetadata.coordinateTransformations,
    dimCount
  )

  return composeTransforms(
    [
      { type: 'scale', scale: dataset.scale },
      { type: 'translation', translation: dataset.translation },
      { type: 'scale', scale: global.scale },
      { type: 'translation', translation: global.translation },
    ],
    dimCount
  )
}

// lazy creation of voxel/pixel/dimenstion coordinates array
const makeCoords = (dims, shape, imageScale, datasetScale) => {
  const coords = new Map(dims.map(dim => [dim, null]))

  const {
    scale: spacingDataset,
    translation: originDataset,
  } = computeTransform(imageScale, datasetScale, dims.length)

  return {
    get(dim) {
      if (coords.get(dim) === null) {
        // make array
        const dimIdx = dims.indexOf(dim)
        const spacing = spacingDataset[dimIdx]
        const origin = originDataset[dimIdx]
        const coordsPerElement = new Float32Array(shape[dimIdx])
        for (let i = 0; i < coordsPerElement.length; i++) {
          coordsPerElement[i] = i * spacing + origin
        }
        coords.set(dim, coordsPerElement)
      }
      return coords.get(dim)
    },
    has(dim) {
      return dims.includes(dim)
    },
  }
}

const computeScaleSpacing = ({
  zattrs,
  multiscaleImage,
  pixelArrayMetadata,
  dataset,
}) => {
  // "axis" metadata not defined in ngff V0.1 so fallback to CONTIGUOUS_CHANNEL_INDEXING
  const dims =
    multiscaleImage.axes?.map(({ name }) => name) ?? CONTIGUOUS_CHANNEL_INDEXING

  const { shape, chunks } = pixelArrayMetadata

  return {
    dims,
    pixelArrayMetadata,
    name: multiscaleImage.name,
    pixelArrayPath: dataset.path,
    coords: makeCoords(dims, shape, multiscaleImage, dataset),
    ranges: zattrs.ranges ?? undefined,
    direction: zattrs.direction ?? undefined,
    chunkCount: toDimensionMap(
      dims,
      dims.map((_, i) => Math.ceil(shape[i] / chunks[i]))
    ),
    chunkSize: toDimensionMap(dims, chunks),
    arrayShape: toDimensionMap(dims, shape),
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

  const componentsInData = info.arrayShape.get('c') ?? 1
  const components = Math.min(componentsInData, 3)
  if (componentsInData !== components) {
    console.warn(
      `itk-vtk-viewer: ${componentsInData} components are not supported.  Maximum 3 components are supported.`
    )
  }

  const imageType = {
    // How many spatial dimensions?  Count greater than 1, X Y Z elements because "axis" metadata not defined in ngff V0.1
    dimension: toDimensionArray(['x', 'y', 'z'], info.arrayShape).filter(
      size => size > 1
    ).length,
    pixelType:
      components === 1 ? PixelTypes.Scalar : PixelTypes.VariableLengthVector,
    componentType: dtypeToComponentType.get(info.pixelArrayMetadata.dtype),
    components,
  }

  return { scaleInfo, imageType }
}

class ZarrMultiscaleSpatialImage extends MultiscaleSpatialImage {
  // Store parameter is object with getItem, but not a ZarrStore
  static async fromStore(store) {
    const zarrStore = new ZarrStore(store)
    const { scaleInfo, imageType } = await extractScaleSpacing(zarrStore)
    return new ZarrMultiscaleSpatialImage(zarrStore, scaleInfo, imageType)
  }

  static async fromUrl(url) {
    return ZarrMultiscaleSpatialImage.fromStore(new HttpStore(url))
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

    const { dimension_separator: dimSeparator = '.' } = info.pixelArrayMetadata

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

export default ZarrMultiscaleSpatialImage

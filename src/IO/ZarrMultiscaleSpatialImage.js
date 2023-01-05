import { IntTypes, PixelTypes } from 'itk-wasm'

import MultiscaleSpatialImage from './MultiscaleSpatialImage'
import bloscZarrDecompress from '../Compression/bloscZarrDecompress'
import ZarrStoreParser from './ZarrStoreParser'
import HttpStore from './HttpStore'
import { CXYZT, toDimensionMap } from './dimensionUtils'
import { getComponentType } from './dtypeUtils'

import PQueue from 'p-queue'

// ends with zarr and optional nested image name like foo.zarr/image1
export const isZarr = url => /zarr((\/)[\w-]+\/?)?$/.test(url)

const TCZYX = Object.freeze(['t', 'c', 'z', 'y', 'x'])

const composeTransforms = (transforms = [], dimCount) =>
  transforms.reduce(
    ({ scale, translation }, transform) => {
      if (transform.type === 'scale') {
        const { scale: transformScale } = transform
        return {
          scale: scale.map((s, i) => s * transformScale[i]),
          translation: translation.map((t, i) => t * transformScale[i]),
        }
      } else if (transform.type === 'translation') {
        const { translation: transformTranslation } = transform
        return {
          scale,
          translation: translation.map((t, i) => t + transformTranslation[i]),
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

// if missing coordinateTransformations, make all scales same size as finest scale
const ensureScaleTransforms = datasetsWithArrayMetadata => {
  const hasDatasetCoordinateTransform = datasetsWithArrayMetadata.some(
    ({ dataset }) => dataset.coordinateTransformations
  )
  if (hasDatasetCoordinateTransform) return datasetsWithArrayMetadata

  const targetSize = datasetsWithArrayMetadata[0].pixelArrayMetadata.shape

  return datasetsWithArrayMetadata.map(({ dataset, pixelArrayMetadata }) => {
    const { shape } = pixelArrayMetadata
    const scale = targetSize.map((target, idx) => target / shape[idx])
    return {
      dataset: {
        ...dataset,
        coordinateTransformations: [{ scale, type: 'scale' }],
      },
      pixelArrayMetadata,
    }
  })
}

// lazy creation of voxel/pixel/dimension coordinates array
const makeCoords = ({ shape, multiscaleImage, dataset }) => {
  const axes = multiscaleImage.axes?.map(({ name }) => name) ?? TCZYX
  const coords = new Map(axes.map(dim => [dim, null]))

  const {
    scale: spacingDataset,
    translation: originDataset,
  } = computeTransform(multiscaleImage, dataset, axes.length)

  return {
    get(dim) {
      if (coords.get(dim) === null) {
        // make array
        const dimIdx = axes.indexOf(dim)
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
      return axes.includes(dim)
    },
  }
}

const findAxesLongNames = async ({ dataset, dataSource, dims }) => {
  const upOneLevel = dataset.path
    .split('/')
    .slice(0, -1)
    .join('')
  return new Map(
    await Promise.all(
      dims.map(dim => dataSource.getItem(`${upOneLevel}/${dim}/.zattrs`))
    ).then(dimensionsZattrs =>
      dimensionsZattrs.map(({ long_name }, i) => [dims[i], long_name])
    )
  )
}

const createScaledImageInfo = async ({
  multiscaleImage,
  dataset,
  pixelArrayMetadata,
  dataSource,
  multiscaleSpatialImageVersion,
}) => {
  const scaleZattrs = multiscaleSpatialImageVersion
    ? await dataSource.getItem(`${dataset.path}/.zattrs`)
    : {}

  const dims =
    scaleZattrs._ARRAY_DIMENSIONS ??
    multiscaleImage.axes?.map(axis => axis.name ?? axis) ??
    TCZYX // default to TCZYX for NGFF v0.1

  const { shape, chunks } = pixelArrayMetadata

  const chunkSize = toDimensionMap(dims, chunks)
  const arrayShape = toDimensionMap(dims, shape)

  const axesNames = multiscaleSpatialImageVersion
    ? await findAxesLongNames({ dataset, dataSource, dims })
    : undefined

  return {
    dims,
    pixelArrayMetadata,
    name: multiscaleImage.name,
    pixelArrayPath: dataset.path,
    coords: makeCoords({ shape, multiscaleImage, dataset }),
    ranges: scaleZattrs.ranges ?? multiscaleImage.ranges,
    direction: scaleZattrs.direction ?? multiscaleImage.direction,
    axesNames,
    chunkCount: toDimensionMap(
      dims,
      dims.map(dim => Math.ceil(arrayShape.get(dim) / chunkSize.get(dim)))
    ),
    chunkSize,
    arrayShape,
  }
}

const extractScaleSpacing = async dataSource => {
  const zattrs = await dataSource.getItem('.zattrs')

  const { multiscales, multiscaleSpatialImageVersion } = zattrs
  const multiscaleImage = Array.isArray(multiscales)
    ? multiscales[0] // if multiple images (multiscales), just grab first one
    : multiscales

  const datasetsWithArrayMetadataRaw = await Promise.all(
    multiscaleImage.datasets.map(async dataset => ({
      dataset,
      pixelArrayMetadata: await dataSource.getItem(`${dataset.path}/.zarray`),
    }))
  )

  const datasetsWithArrayMetadata = ensureScaleTransforms(
    datasetsWithArrayMetadataRaw
  )

  const scaleInfo = await Promise.all(
    datasetsWithArrayMetadata.map(async ({ dataset, pixelArrayMetadata }) => {
      return createScaledImageInfo({
        multiscaleImage,
        dataset,
        pixelArrayMetadata,
        dataSource,
        multiscaleSpatialImageVersion,
      })
    })
  )

  const info = scaleInfo[0]

  const components = info.arrayShape.get('c') ?? 1

  const componentType = getComponentType(info.pixelArrayMetadata.dtype)

  let pixelType = PixelTypes.Scalar
  if (components !== 1) {
    if (
      components === 3 &&
      !info.arrayShape.has('z') &&
      componentType === IntTypes.Uint8
    ) {
      pixelType = PixelTypes.RGB
    } else if (
      components === 4 &&
      !info.arrayShape.has('z') &&
      componentType === IntTypes.Uint8
    ) {
      pixelType = PixelTypes.RGBA
    } else {
      pixelType = PixelTypes.VariableLengthVector
    }
  }

  const imageType = {
    // How many spatial dimensions?  Count greater than 1, X Y Z elements because "axis" metadata not defined in ngff V0.1
    dimension: ['x', 'y', 'z'].filter(dim => info.arrayShape.get(dim) > 1)
      .length,
    pixelType,
    componentType,
    components,
  }

  return { scaleInfo, imageType }
}

class ZarrMultiscaleSpatialImage extends MultiscaleSpatialImage {
  // Store parameter is object with getItem (but not a ZarrStoreParser)
  static async fromStore(store) {
    const zarrStoreParser = new ZarrStoreParser(store)
    const { scaleInfo, imageType } = await extractScaleSpacing(zarrStoreParser)
    return new ZarrMultiscaleSpatialImage(zarrStoreParser, scaleInfo, imageType)
  }

  static async fromUrl(url) {
    return ZarrMultiscaleSpatialImage.fromStore(new HttpStore(url))
  }

  // Use static factory functions to construct
  constructor(zarrStoreParser, scaleInfo, imageType) {
    super(scaleInfo, imageType)
    this.dataSource = zarrStoreParser
    this.rpcQueue = new PQueue({ concurrency: 10 })
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
      chunkPromises.push(() => this.dataSource.getItem(chunkPath))
    }
    const compressedChunks = await this.rpcQueue.addAll(chunkPromises)

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

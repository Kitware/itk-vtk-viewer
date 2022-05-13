import { PixelTypes } from 'itk-wasm'

import MultiscaleSpatialImage from './MultiscaleSpatialImage'
import bloscZarrDecompress from '../Compression/bloscZarrDecompress'
import ZarrStoreParser from './ZarrStoreParser'
import HttpStore from './HttpStore'
import { CXYZT, toDimensionMap } from './dimensionUtils'
import { getComponentType } from './dtypeUtils'

// ends with zarr and optional nested image name like foo.zarr/image1
export const isZarr = url => /zarr((\/)[\w-]+\/?)?$/.test(url)

const TCZYX = Object.freeze(['t', 'c', 'z', 'y', 'x'])

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

const createScaledImageInfo = ({
  multiscaleImage,
  pixelArrayMetadata,
  pixelArrayAttrs,
  dataset,
}) => {
  const dims =
    pixelArrayAttrs?._ARRAY_DIMENSIONS ?? // xarray
    multiscaleImage.axes?.map(({ name }) => name) ?? // NGFF
    TCZYX // NGFF v0.1

  const { shape, chunks } = pixelArrayMetadata

  const chunkSize = toDimensionMap(dims, chunks)
  const arrayShape = toDimensionMap(dims, shape)

  const componentsInData = arrayShape.get('c') ?? 1
  const components = Math.min(componentsInData, 3)
  if (componentsInData !== components) {
    console.warn(
      `itk-vtk-viewer: ${componentsInData} components are not supported. Falling back to ${components} components.`
    )
    arrayShape.set('c', components)
  }

  return {
    dims,
    pixelArrayMetadata,
    name: multiscaleImage.name,
    pixelArrayPath: dataset.path,
    coords: makeCoords({ shape, multiscaleImage, dataset }),
    ranges: pixelArrayAttrs?.ranges,
    direction: pixelArrayAttrs?.direction,
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

  const { multiscales } = zattrs
  const multiscaleImage = Array.isArray(multiscales)
    ? multiscales[0] // if multiple images (multiscales), just grab first one
    : multiscales

  const scaleInfo = await Promise.all(
    multiscaleImage.datasets.map(async dataset => {
      const pixelArrayMetadata = await dataSource.getItem(
        `${dataset.path}/.zarray`
      )
      const pixelArrayAttrs = await dataSource
        .getItem(`${dataset.path}/.zattrs`)
        .catch(() => Promise.resolve(undefined)) // in xarray, maybe not in NGFF
      return createScaledImageInfo({
        multiscaleImage,
        pixelArrayMetadata,
        pixelArrayAttrs,
        dataset,
      })
    })
  )

  const info = scaleInfo[0]

  const components = info.arrayShape.get('c') ?? 1

  const imageType = {
    // How many spatial dimensions?  Count greater than 1, X Y Z elements because "axis" metadata not defined in ngff V0.1
    dimension: ['x', 'y', 'z'].filter(dim => info.arrayShape.get(dim) > 1)
      .length,
    pixelType:
      components === 1 ? PixelTypes.Scalar : PixelTypes.VariableLengthVector,
    componentType: getComponentType(info.pixelArrayMetadata.dtype),
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
      chunkPromises.push(this.dataSource.getItem(chunkPath))
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

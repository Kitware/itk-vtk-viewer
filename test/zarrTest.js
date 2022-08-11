import { IntTypes, PixelTypes } from 'itk-wasm'
import test from 'tape-catch'

const testZarrV1 = 'base/test/data/input/64x64-fake-v0.1.zarr/0'
const testZarrV4 = 'base/test/data/input/64x64-fake-v0.4.zarr/0'

import HttpStore from '../src/IO/HttpStore'
import ZarrStoreParser from '../src/IO/ZarrStoreParser'
import toMultiscaleSpatialImage from '../src/IO/toMultiscaleSpatialImage'
import ZarrMultiscaleSpatialImage, {
  computeTransform,
  isZarr,
} from '../src/IO/ZarrMultiscaleSpatialImage'
import { getBaselines, takeSnapshot } from './zarrImageBaselines'

const verifyImage = (t, image, msgPrefix = '') => {
  const imageTypeBaseline = {
    dimension: 2,
    pixelType: PixelTypes.Scalar,
    componentType: IntTypes.UInt8,
    components: 1,
  }
  t.deepEqual(image.imageType, imageTypeBaseline, msgPrefix + ' image type set')
  t.deepEqual(image.origin, [0, 0], msgPrefix + ' image origin set')
  t.deepEqual(image.spacing, [1, 1], msgPrefix + ' image spacing set')
  t.deepEqual(image.size, [64, 64], msgPrefix + ' image size set')
  t.equal(image.data.length, 4096, msgPrefix + ' image data length set')
}

test('Test isZarr', t => {
  t.true(isZarr('foo.zarr'), 'no suffix')
  t.true(isZarr('foo.zarr/0'), '/0 suffix')
  t.true(isZarr('foo.zarr/asdf'), '/asdf suffix')
  t.true(isZarr('foo/zarr/asdf'), 'no dot before zarr')
  t.true(
    isZarr(
      'https://dandiarchive.s3.amazonaws.com/zarr/3d313fc2-0204-496d-bfa1-5c90951ee640'
    ),
    'real url'
  )

  t.false(isZarr('foo.asdf'), 'not when .asdf extension')
  t.false(
    isZarr('foo.zarr.asdf/asdf'),
    'not when .asdf extension and has suffix'
  )

  t.false(isZarr('foo.zarr.asdf.baz'), '.baz suffix')
  t.false(isZarr('foo.zarrX.png'), '.zarrX extension, not .zarr')

  t.end()
})

test('Test ZarrStoreParser', async t => {
  const storeURL = new URL(testZarrV4, document.location.origin)

  const httpStore = new HttpStore(storeURL)

  const zarrStoreParser = new ZarrStoreParser(httpStore)

  const topZattrsBaseline = {
    multiscales: [
      {
        axes: [
          {
            name: 'y',
            type: 'space',
            units: 'micrometer',
          },
          {
            name: 'x',
            type: 'space',
            units: 'micrometer',
          },
        ],
        datasets: [
          {
            path: '0',
            coordinateTransformations: [
              {
                scale: [1, 1],
                type: 'scale',
              },
            ],
          },
        ],
        name: 'testimage',
        version: '0.4',
      },
    ],
  }

  const topZattrs = await zarrStoreParser.getItem('.zattrs')
  t.deepEqual(topZattrs, topZattrsBaseline, 'getItem top .zattrs')

  const arrayBaseline = {
    chunks: [64, 64],
    compressor: {
      clevel: 5,
      blocksize: 0,
      shuffle: 1,
      cname: 'lz4',
      id: 'blosc',
    },
    dtype: '>u1',
    fill_value: 0,
    filters: null,
    order: 'C',
    shape: [64, 64],
    zarr_format: 2,
    dimension_separator: '/',
  }

  const firstArrayPath = topZattrs.multiscales[0].datasets[0].path
  const arrayMetadataPath = `${firstArrayPath}/.zarray`
  const arrayMetadata = await zarrStoreParser.getItem(arrayMetadataPath)

  t.deepEqual(arrayMetadata, arrayBaseline, 'getItem .zarray')

  const { dimension_separator: separator } = arrayMetadata
  const firstChunkPath = `${firstArrayPath}${separator}0${separator}0`
  const firstChunk = await zarrStoreParser.getItem(firstChunkPath)

  t.equal(firstChunk.byteLength, 128, 'getItem of chunk data has bytes')

  t.end()
})

test('Test ZarrMultiscaleSpatialImage metadata fetching', async t => {
  const versionTests = [
    [testZarrV1, 'v0.1'],
    [testZarrV4, 'v0.4'],
  ].map(async ([filePath, version]) => {
    const storeURL = new URL(filePath, document.location.origin)
    const zarrImage = await ZarrMultiscaleSpatialImage.fromUrl(storeURL)

    t.equal(zarrImage.scaleInfo.length, 1, `${version} number of scales`)

    const viewerImage = await zarrImage.getImage(0)

    verifyImage(t, viewerImage, version)
  })

  await Promise.all(versionTests)

  t.end()
})

test('Test ZarrMultiscaleSpatialImage chunk assembly', async t => {
  for (const { path, baseline } of getBaselines()) {
    const storeURL = new URL(path, document.location.origin)
    const zarrImage = await ZarrMultiscaleSpatialImage.fromUrl(storeURL)
    const itkImage = await zarrImage.getImage(zarrImage.scaleInfo.length - 1)

    t.deepEqual(
      takeSnapshot(itkImage),
      baseline,
      `${path} image matches baseline`
    )
  }

  t.end()
})

test('Test toMultiscaleSpatialImage from store', async t => {
  const storeURL = new URL(testZarrV4, document.location.origin)
  const zarrImage = await toMultiscaleSpatialImage(new HttpStore(storeURL))
  const viewerImage = await zarrImage.getImage(0)

  verifyImage(t, viewerImage)

  t.end()
})

test('Test ngff metadata coordinate transformations image and dataset interaction', t => {
  const { scale, translation } = computeTransform(
    {
      coordinateTransformations: [
        {
          scale: [1, 2, 5],
          type: 'scale',
        },
      ],
    },
    {
      coordinateTransformations: [
        {
          translation: [1, 1, 2],
          type: 'translation',
        },
      ],
    },
    3
  )

  t.deepEqual(scale, [1, 2, 5], 'dataset scale computed')
  t.deepEqual(translation, [1, 2, 10], 'dataset translation computed')
  t.end()
})

test('Test ngff metadata coordinate transformations missing image coordinateTransformations', t => {
  const { scale, translation } = computeTransform(
    {},
    {
      coordinateTransformations: [
        {
          translation: [3, 3, 3],
          type: 'translation',
        },
        {
          scale: [2, 2, 2],
          type: 'scale',
        },
      ],
    },
    3
  )

  t.deepEqual(scale, [2, 2, 2], 'dataset scale computed')
  t.deepEqual(translation, [6, 6, 6], 'dataset translation computed')
  t.end()
})

test('Test ngff metadata coordinate transformations stacking', t => {
  const { scale, translation } = computeTransform(
    {},
    {
      coordinateTransformations: [
        {
          scale: [1, 1, 2],
          type: 'scale',
        },
        {
          translation: [1, 1, 2],
          type: 'translation',
        },
        {
          scale: [2, 1, 1],
          type: 'scale',
        },
        {
          translation: [1, 1, 2],
          type: 'translation',
        },
      ],
    },
    3
  )

  t.deepEqual(scale, [2, 1, 2], 'dataset scale computed')
  t.deepEqual(translation, [3, 2, 4], 'dataset translation computed')
  t.end()
})

const REAL_TRANSFORMATIONS = {
  coordinateTransformations: [
    {
      scale: [10, 1, 1, 1, 1],
      type: 'scale',
    },
    {
      translation: [2, 0, 0, 0, 2],
      type: 'translation',
    },
  ],
  datasets: [
    {
      coordinateTransformations: [
        {
          scale: [1, 1, 1.0, 0.65, 0.65],
          type: 'scale',
        },
      ],
      path: 's0',
    },
    {
      coordinateTransformations: [
        {
          scale: [1, 1, 2.0, 1.3, 1.3],
          type: 'scale',
        },
      ],
      path: 's1',
    },
    {
      coordinateTransformations: [
        {
          scale: [1, 1, 4.0, 2.6, 2.6],
          type: 'scale',
        },
      ],
      path: 's2',
    },
  ],
}

test('Test ngff metadata coordinate transformations with real JSON', t => {
  const imageMetadata = REAL_TRANSFORMATIONS
  const datasetMetadata = REAL_TRANSFORMATIONS.datasets[2]
  const { scale, translation } = computeTransform(
    imageMetadata,
    datasetMetadata,
    5
  )

  t.deepEqual(scale, [10, 1, 4.0, 2.6, 2.6], 'dataset scale computed')
  t.deepEqual(translation, [2, 0, 0, 0, 2], 'dataset translation computed')
  t.end()
})

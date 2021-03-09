import test from 'tape-catch'

const testZarr = 'base/test/data/input/logo.zarr'

import ConsolidatedMetadataStore from '../src/IO/ConsolidatedMetadataStore'
import ZarrMultiscaleChunkedImage from '../src/IO/ZarrMultiscaleChunkedImage'
import toMultiscaleChunkedImage from '../src/IO/toMultiscaleChunkedImage'

import PixelTypes from 'itk/PixelTypes'
import IntTypes from 'itk/IntTypes'

async function verifyImage(t, image) {
  const imageTypeBaseline = {
    dimension: 2,
    pixelType: PixelTypes.RGB,
    componentType: IntTypes.UInt8,
    components: 3,
  }
  t.deepEqual(image.imageType, imageTypeBaseline, 'RGB imageType')

  const cxyztArray = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
  ]
  const scale = 1
  const chunks = await image.getChunks(scale, cxyztArray)
  const chunkBaseline = [255, 255, 255, 0, 0, 0]
  t.deepEqual(
    Array.from(chunks[0].slice(0, chunkBaseline.length)),
    chunkBaseline,
    'decompressed chunk 0'
  )
  t.deepEqual(
    Array.from(chunks[1].slice(0, chunkBaseline.length)),
    chunkBaseline,
    'decompressed chunk 1'
  )
  t.deepEqual(
    Array.from(chunks[2].slice(0, chunkBaseline.length)),
    chunkBaseline,
    'decompressed chunk 2'
  )

  const lowestScale = image.lowestScale
  t.equal(lowestScale, 3, 'lowestScale')

  const origin0 = await image.scaleOrigin(0)
  t.deepEqual(origin0, [0, 0], 'origin 0')
  const origin1 = await image.scaleOrigin(1)
  t.deepEqual(origin1, [0.5, 0.5], 'origin 1')

  const spacing0 = await image.scaleSpacing(0)
  t.deepEqual(spacing0, [1, 1], 'spacing 0')
  const spacing1 = await image.scaleSpacing(1)
  t.deepEqual(spacing1, [2, 2], 'spacing 1')

  const direction = image.direction
  t.deepEqual(direction.data, [1, 0, 0, 1], 'direction')

  const image0 = await image.scaleLargestImage(0)
  t.deepEqual(image0.imageType, imageTypeBaseline, 'image0 imageType')
  t.deepEqual(image0.size, [480, 294], 'image0 size')
  t.deepEqual(image0.data.length, 423360, 'image0 data length')

  const image1 = await image.scaleLargestImage(1)
  t.deepEqual(image1.imageType, imageTypeBaseline, 'image1 imageType')
  t.deepEqual(image1.size, [240, 147], 'image1 size')
  t.deepEqual(image1.data.length, 105840, 'image1 data length')
}

test('Test ConsolidatedMetadataStore', async t => {
  const storeURL = new URL(testZarr, document.location.origin)
  const metadata = await ConsolidatedMetadataStore.retrieveMetadata(storeURL)
  const store = new ConsolidatedMetadataStore(storeURL, metadata)
  const decoder = new TextDecoder()

  const topZattrsBaseline = {
    multiscales: [
      {
        datasets: [
          {
            path: '0/itkLogo',
          },
          {
            path: '1/itkLogo',
          },
          {
            path: '2/itkLogo',
          },
          {
            path: '3/itkLogo',
          },
        ],
        name: 'itkLogo',
        version: '0.1',
      },
    ],
  }
  const topZattrs = await store.getItem('.zattrs')
  t.deepEqual(
    JSON.parse(decoder.decode(topZattrs)),
    topZattrsBaseline,
    'getItem top .zattrs'
  )

  const nestedZattrsBaseline = {
    _ARRAY_DIMENSIONS: ['c'],
  }
  const nestedZattrs = await store.getItem('0/c/.zattrs')
  t.deepEqual(
    JSON.parse(decoder.decode(nestedZattrs)),
    nestedZattrsBaseline,
    'getItem nested .zattrs'
  )

  const zgroupBaseline = {
    zarr_format: 2,
  }
  const zgroup = await store.getItem('1/.zgroup')
  t.deepEqual(
    JSON.parse(decoder.decode(zgroup)),
    zgroupBaseline,
    'getItem .zgroup'
  )

  const zarrayBaseline = {
    chunks: [3],
    compressor: {
      blocksize: 0,
      clevel: 5,
      cname: 'lz4',
      id: 'blosc',
      shuffle: 1,
    },
    dtype: '<u8',
    fill_value: null,
    filters: null,
    order: 'C',
    shape: [3],
    zarr_format: 2,
  }
  const zarray = await store.getItem('0/c/.zarray')
  t.deepEqual(
    JSON.parse(decoder.decode(zarray)),
    zarrayBaseline,
    'getItem .zarray'
  )

  const chunk1DArrayBuffer = await store.getItem('0/c/0')
  const chunk1D = new Uint8Array(chunk1DArrayBuffer)
  const chunk1DBaseline = [
    2,
    1,
    51,
    8,
    24,
    0,
    0,
    0,
    24,
    0,
    0,
    0,
    40,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]
  t.deepEqual(Array.from(chunk1D), chunk1DBaseline, 'chunk 1D')

  const chunk3DArrayBuffer = await store.getItem('3/itkLogo/0.0.0')
  const chunk3D = new Uint8Array(chunk3DArrayBuffer)
  const chunk3DBaseline = [
    2,
    1,
    145,
    1,
    0,
    0,
    4,
    0,
    0,
    0,
    4,
    0,
    150,
    8,
    0,
    0,
    20,
    0,
    0,
    0,
    126,
    8,
    0,
    0,
    40,
    181,
    47,
    253,
    160,
    0,
    0,
    4,
    0,
    68,
    65,
    0,
    228,
    67,
    255,
    255,
    255,
    0,
    254,
    254,
    254,
    253,
    242,
    217,
    252,
    235,
    197,
    254,
    251,
    245,
    253,
    247,
    232,
    250,
    215,
    140,
    246,
    186,
    50,
    246,
    176,
    21,
    181,
    37,
    249,
    211,
    127,
    253,
    243,
    222,
    252,
    237,
    204,
    248,
    202,
    100,
    246,
    177,
    25,
    247,
    190,
    65,
    249,
    213,
    133,
    22,
    248,
    202,
    99,
    253,
    243,
    221,
    253,
    240,
    224,
    246,
  ]
  t.deepEqual(
    Array.from(chunk3D.slice(0, chunk3DBaseline.length)),
    chunk3DBaseline,
    'chunk 3D'
  )

  const attrsPresent = await store.containsItem('0/c/.zarray')
  t.equal(attrsPresent, true, 'containsItem zattrs true')

  const attrsNotPresent = await store.containsItem('0/ccc/.zarray')
  t.equal(attrsNotPresent, false, 'containsItem zattrs false')

  const chunkPresent = await store.containsItem('0/c/0')
  t.equal(chunkPresent, true, 'containsItem chunk true')

  // Skip to avoid console 404
  //const chunkNotPresent = await store.containsItem('0/ccc/0')
  //t.equal(chunkNotPresent, false, 'containsItem chunk false')

  t.end()
})

test('Test ZarrMultiscaleChunkedImage', async t => {
  const storeURL = new URL(testZarr, document.location.origin)
  const consolidatedMetadata = await ConsolidatedMetadataStore.retrieveMetadata(
    storeURL
  )
  const store = new ConsolidatedMetadataStore(storeURL, consolidatedMetadata)

  const {
    scaleInfo,
    imageType,
  } = await ZarrMultiscaleChunkedImage.extractScaleInfo(store)

  t.equal(scaleInfo.length, 4, 'number of scales')

  const image = new ZarrMultiscaleChunkedImage(store, scaleInfo, imageType)

  await verifyImage(t, image)

  t.end()
})

test('Test toMultiscaleChunkedImage from store', async t => {
  const storeURL = new URL(testZarr, document.location.origin)
  const consolidatedMetadata = await ConsolidatedMetadataStore.retrieveMetadata(
    storeURL
  )

  const store = new ConsolidatedMetadataStore(storeURL, consolidatedMetadata)

  const image = await toMultiscaleChunkedImage(store)

  await verifyImage(t, image)

  t.end()
})

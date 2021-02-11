import test from 'tape-catch'

const testZarr = 'base/test/data/input/logo.zarr'

import ConsolidatedMetadataStore from '../src/IO/ConsolidatedMetadataStore'

test('Test ConsolidatedMetadataStore', async t => {
  const storeURL = new URL(testZarr, document.location.origin)
  const metadata = await ConsolidatedMetadataStore.retrieveMetadata(storeURL)
  const store = new ConsolidatedMetadataStore(storeURL, metadata)

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
  t.deepEqual(topZattrs, topZattrsBaseline, 'getItem top .zattrs')

  const nestedZattrsBaseline = {
    _ARRAY_DIMENSIONS: ['c'],
  }
  const nestedZattrs = await store.getItem('0/c/.zattrs')
  t.deepEqual(nestedZattrs, nestedZattrsBaseline, 'getItem nested .zattrs')

  const zgroupBaseline = {
    zarr_format: 2,
  }
  const zgroup = await store.getItem('1/.zgroup')
  t.deepEqual(zgroup, zgroupBaseline, 'getItem .zgroup')

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
  t.deepEqual(zarray, zarrayBaseline, 'getItem .zarray')

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

  t.pass('ConsolidatedMetadataStore')
  t.end()
})

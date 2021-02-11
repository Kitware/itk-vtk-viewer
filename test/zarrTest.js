import test from 'tape-catch'

const testZarr = 'base/test/data/input/logo.zarr'

import ConsolidatedMetadataStore from '../src/IO/ConsolidatedMetadataStore'

test('Test ConsolidatedMetadataStore', async t => {
  const metadata = await ConsolidatedMetadataStore.parseMetadata(testZarr)

  const store = new ConsolidatedMetadataStore(metadata)

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

  t.pass('ConsolidatedMetadataStore')
  t.end()
})

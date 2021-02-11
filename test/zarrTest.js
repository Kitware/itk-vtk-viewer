import test from 'tape-catch'

const testZarr = 'base/test/data/input/logo.zarr'

import ConsolidatedMetadataStore from '../src/IO/ConsolidatedMetadataStore'

test('Test ConsolidatedMetadataStore', async t => {
  const metadata = await ConsolidatedMetadataStore.parseMetadata(testZarr)
  console.log(metadata)
  t.pass('ConsolidatedMetadataStore')
  t.end()
})

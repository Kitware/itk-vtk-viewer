// To update the testing data, add new data test at ./test/data, then:
//
// // Add your token from https://web3.storage, if not present on this system
// npx w3 token
//
// npx w3 put ./test/data/ --no-wrap -n itk-vtk-viewer-testing-data-topic-name -H
//
// And update the resulting CID below.
//
const IPFS_CID = 'bafybeiblyqbexq4osnmcazxra24rmt36ecuzcysap6wnri2jazqa3kxh5u'

import fs from 'fs'

import { config, getClient } from '@web3-storage/w3/lib.js'
import { writeFiles } from 'ipfs-car/unpack/fs'

async function downloadData(cid, token, outputDir) {
  const client = getClient({ token })
  const res = await client.get(cid)
  await writeFiles(res.unixFsIterator(), outputDir)
}

const testDataDir = './test/data'
if (!fs.existsSync(testDataDir)) {
  console.log('Test data not found. Downloading.')
  // eslint-disable-next-line no-undef
  let token = process.env.WEB3STORAGE_TOKEN
  if (!token) {
    token = config.get('token')
  }
  await downloadData(IPFS_CID, token, testDataDir)
} else {
  console.log('Test data found.')
}

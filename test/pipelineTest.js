import test from 'tape-catch'
import axios from 'axios'

import { readImageArrayBuffer } from 'itk-wasm'
import testUtils from 'vtk.js/Sources/Testing/testUtils'

import createViewer from '../src/createViewer'
import './customElementsDefineOverride.js'

const testImage3DPath = 'base/test/data/input/HeadMRVolume.nrrd'
const testLabelImage3DPath =
  'base/test/data/input/HeadMRVolumeLabelsSmaller.nrrd'

test('Test createViewer with smaller size label image', async t => {
  const gc = testUtils.createGarbageCollector(t)

  const container = document.querySelector('body')
  const viewerContainer = gc.registerDOMElement(document.createElement('div'))
  container.appendChild(viewerContainer)

  const imageResponse = await axios.get(testImage3DPath, {
    responseType: 'arraybuffer',
  })
  const { image, webWorker: imageWorker } = await readImageArrayBuffer(
    null,
    imageResponse.data,
    'data.nrrd'
  )
  imageWorker.terminate()

  const labelResponse = await axios.get(testLabelImage3DPath, {
    responseType: 'arraybuffer',
  })
  const {
    image: labelImage,
    webWorker: labelWorker,
  } = await readImageArrayBuffer(null, labelResponse.data, 'data.nrrd')
  labelWorker.terminate()

  const viewer = await createViewer(container, {
    image,
    labelImage,
    rotate: false,
  })

  t.plan(1)
  viewer.once('renderedImageAssigned', () => {
    t.pass('createViewer did not crash with smaller label image')
    gc.releaseResources()
  })
})

import test from 'tape-catch'
import axios from 'axios'

import itkreadImageArrayBuffer from 'itk/readImageArrayBuffer'
import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import testUtils from 'vtk.js/Sources/Testing/testUtils'

import createViewer from '../src/createViewer'
import UserInterface from '../src/UserInterface'

const testImage3DPath = 'base/test/data/input/HeadMRVolume.nrrd'
const testImage3DPath2 = 'base/test/data/input/mri3D.nrrd'

import createViewerBaseline from './data/baseline/createViewer.png'
import createViewerSetImageBaseline from './data/baseline/createViewerSetImage.png'

import * as imjoyCore from 'imjoy-core'
import ndarray from 'ndarray'

const TEST_STYLE_CONTAINER = {
  position: 'relative',
  width: '600px',
  height: '600px',
  minHeight: '600px',
  minWidth: '600px',
  maxHeight: '600px',
  maxWidth: '600px',
  margin: '0',
  padding: '0',
  top: '0',
  left: '0',
  overflow: 'hidden',
}
const TEST_VIEWER_STYLE = {
  backgroundColor: [1, 1, 1],
  containerStyle: TEST_STYLE_CONTAINER,
}
function applyStyle(el, style) {
  Object.keys(style).forEach(key => {
    el.style[key] = style[key]
  })
}
function encodeArray(array) {
  return {
    _rtype: 'ndarray',
    _rdtype: array.dtype,
    _rshape: array.shape,
    _rvalue: array.data.buffer,
  }
}

test('Test ImJoy Plugin', async t => {
  const gc = testUtils.createGarbageCollector(t)

  const container = document.querySelector('body')
  const viewerContainer = gc.registerDOMElement(document.createElement('div'))
  container.appendChild(viewerContainer)

  const response = await axios.get(testImage3DPath, {
    responseType: 'arraybuffer',
  })
  const { image: itkImage, webWorker } = await itkreadImageArrayBuffer(
    null,
    response.data,
    'data.nrrd'
  )
  webWorker.terminate()
  const array = ndarray(itkImage.data, itkImage.size.slice().reverse())

  const imjoy_api = {
    showMessage(plugin, info, duration) {
      console.log(info)
    },
  }
  const imjoy = new imjoyCore.ImJoy({
    imjoy_api,
  })
  imjoy.event_bus.on('show_message', console.log)
  imjoy.event_bus.on('add_window', async w => {
    viewerContainer.id = w.window_id
    applyStyle(viewerContainer, TEST_STYLE_CONTAINER)
  })
  await imjoy.start({ workspace: 'default' })
  console.log('ImJoy started')

  const viewer = await imjoy.pm.createWindow(null, {
    src: 'http://localhost:9876/base/dist/index.html',
    data: { image: itkImage },
  })
  await viewer.setImage(encodeArray(array))
  await viewer.setImage(testImage3DPath)
  await viewer.setImage([testImage3DPath])
  const file = new File(
    [new Blob([response.data], { type: 'application/octet-stream' })],
    'data.nrrd'
  )
  await viewer.setImage(file)
  await viewer.setImage([file])
  imjoy.destroy()
  console.log('ImJoy destroyed')
  gc.releaseResources()

  t.pass()
})

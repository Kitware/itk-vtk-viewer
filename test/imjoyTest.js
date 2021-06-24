import test from 'tape-catch'
import axios from 'axios'

import itkreadImageArrayBuffer from 'itk/readImageArrayBuffer'
import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import testUtils from 'vtk.js/Sources/Testing/testUtils'

import UserInterface from '../src/UserInterface'

const testImage3DPath = 'base/test/data/input/HeadMRVolume.nrrd'
const testImage3DPath2 = 'base/test/data/input/mri3D.nrrd'

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

const testConfig = JSON.parse(
  '{"viewerConfigVersion":"0.2","xyLowerLeft":true,"containerStyle":{"position":"relative","width":"600px","height":"600px","minHeight":"600px","minWidth":"600px","maxHeight":"600px","maxWidth":"600px","margin":"0","padding":"0","top":"0","left":"0","overflow":"hidden"},"main":{"backgroundColor":[0.7,0.2,0.8],"units":"mm"}}'
)

test('Test ImJoy Plugin', async t => {
  t.plan(6)
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

  const points = ndarray(new Float32Array([1, 0, 0, 0, 1, 0]), [2, 3])
  const pointSets = [encodeArray(points)]
  let viewer = await imjoy.pm.createWindow(null, {
    src: 'http://localhost:9876/base/dist/index.html',
    data: { pointSets },
    config: testConfig,
  })
  const points2D = ndarray(new Float32Array([1, 0, 0, 1]), [2, 2])
  const pointSets2D = [encodeArray(points2D)]
  await viewer.setPointSets(pointSets2D)
  t.pass('setPointSets ndarray')

  viewer = await imjoy.pm.createWindow(null, {
    src: 'http://localhost:9876/base/dist/index.html',
    data: { image: itkImage },
    config: testConfig,
  })
  await viewer.setImage(encodeArray(array))
  t.pass('setImage ndarray')

  const bgColor = [0.2, 0.8, 0.7]
  await viewer.setBackgroundColor(bgColor)
  const resultBGColor = await viewer.getBackgroundColor()
  t.same(bgColor, resultBGColor, 'background color')

  await viewer.setImage(itkImage)
  t.pass('setImage itk.js Image')

  const imageURL = new URL(testImage3DPath, document.location.origin)
  await viewer.setImage(imageURL)
  t.pass('setImage URL')

  imjoy.destroy()
  console.log('ImJoy destroyed')

  t.pass('test completed')
  gc.releaseResources()
})

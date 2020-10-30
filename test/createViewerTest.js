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

test('Test createViewer', async t => {
  const gc = testUtils.createGarbageCollector(t)
  t.plan(4)

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

  const viewer = await createViewer(viewerContainer, {
    image: itkImage,
    rotate: false,
    viewerStyle: TEST_VIEWER_STYLE,
  })

  const uiContainer =
    viewerContainer.children[viewerContainer.children.length - 1]
  viewer.setUserInterfaceCollapsed(false)
  let collapsed = viewer.getUserInterfaceCollapsed()
  t.equal(collapsed, false, 'viewer.setUserInterfaceCollapsed false')
  viewer.setUserInterfaceCollapsed(true)
  collapsed = viewer.getUserInterfaceCollapsed()
  t.equal(collapsed, true, 'viewer.setUserInterfaceCollapsed true')

  const bgColor = [0.7, 0.2, 0.8]
  viewer.once('backgroundColorChanged', data => {
    t.pass('backgroundColorChanged event')
  })
  viewer.setBackgroundColor(bgColor)
  const resultBGColor = viewer.getBackgroundColor()
  t.same(resultBGColor, bgColor, 'background color')

  const viewProxy = viewer.getViewProxy()
  const renderWindow = viewProxy.getOpenglRenderWindow()
  // Consistent baseline image size for regression testing
  renderWindow.setSize(600, 600)
  const representation = viewProxy.getRepresentations()[0]
  const volumeMapper = representation.getMapper()
  viewer.renderLater()
  setTimeout(() => {
    viewer.captureImage().then(screenshot => {
      t.pass()
      //gc.releaseResources()
      //testUtils.compareImages(
      //screenshot,
      //[createViewerBaseline],
      //'Test createViewer',
      //t,
      //2.0,
      //gc.releaseResources
      //)
    })
  }, 100)
})

//test('Test createViewer.setImage', async t => {
//const gc = testUtils.createGarbageCollector(t)

//const container = document.querySelector('body')
//const viewerContainer = gc.registerDOMElement(document.createElement('div'))
//container.appendChild(viewerContainer)

//const response = await axios.get(testImage3DPath, {
//responseType: 'arraybuffer',
//})
//const { image: itkImage, webWorker } = await itkreadImageArrayBuffer(
//null,
//response.data,
//'data.nrrd'
//)
//webWorker.terminate()

//const viewer = await createViewer(container, {
//image: itkImage,
//rotate: false,
//viewerStyle: TEST_VIEWER_STYLE,
//})
//const response2 = await axios.get(testImage3DPath2, {
//responseType: 'arraybuffer',
//})
//const {
//image: itkImage2,
//webWorker: webWorker2,
//} = await itkreadImageArrayBuffer(null, response2.data, 'data.nrrd')
//webWorker2.terminate()

//viewer.setImage(itkImage2)
//const viewProxy = viewer.getViewProxy()
//const renderWindow = viewProxy.getOpenglRenderWindow()
//// Consistent baseline image size for regression testing
//renderWindow.setSize(600, 600)
//const representation = viewProxy.getRepresentations()[0]
//const volumeMapper = representation.getMapper()
//viewer.renderLater()
//setTimeout(() => {
//viewer.captureImage().then(screenshot => {
//testUtils.compareImages(
//screenshot,
//[createViewerSetImageBaseline],
//'Test createViewer.setImage',
//t,
//2.0,
//gc.releaseResources
//)
//}, 100)
//})
//})

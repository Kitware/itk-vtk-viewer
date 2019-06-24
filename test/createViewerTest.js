import test from 'tape-catch'
import axios from 'axios'

import itkreadImageBlob from 'itk/readImageBlob'
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


test('Test createViewer', (t) => {
  const gc = testUtils.createGarbageCollector(t);

  const container = document.querySelector('body')
  const viewerContainer = gc.registerDOMElement(document.createElement('div'))
  container.appendChild(viewerContainer)

  return axios.get(testImage3DPath, {responseType: 'blob'})
    .then(function (response) {
      return itkreadImageBlob(null, response.data, testImage3DPath)
      })
    .then(({ image: itkImage, webWorker }) => {
      webWorker.terminate()

      const imageData = vtkITKHelper.convertItkToVtkImage(itkImage)
      const viewer = createViewer(viewerContainer, { image: imageData, rotate: false, viewerStyle: TEST_VIEWER_STYLE })

      const uiContainer = viewerContainer.children[viewerContainer.children.length - 1];
      const toggleUIButton = uiContainer.children[0];
      viewer.setUserInterfaceCollapsed(false)
      t.equal(toggleUIButton.getAttribute('collapsed') === 'true', false, 'viewer.setUserInterfaceCollapsed false')
      viewer.setUserInterfaceCollapsed(true)
      t.equal(toggleUIButton.getAttribute('collapsed') === 'true', true, 'viewer.setUserInterfaceCollapsed true')

      const viewProxy = viewer.getViewProxy();
      const renderWindow = viewProxy.getOpenglRenderWindow()
      // Consistent baseline image size for regression testing
      renderWindow.setSize(600, 600)
      const representation = viewProxy.getRepresentations()[0];
      const volumeMapper = representation.getMapper();
      viewer.renderLater();
      viewer.captureImage().then((screenshot) => {
        testUtils.compareImages(screenshot, [createViewerBaseline], 'Test createViewer', t, 1.0, gc.releaseResources)
      })
    })
})


test('Test createViewer.setImage', (t) => {
  const gc = testUtils.createGarbageCollector(t);

  const container = document.querySelector('body')
  const viewerContainer = gc.registerDOMElement(document.createElement('div'))
  container.appendChild(viewerContainer)

  return axios.get(testImage3DPath, {responseType: 'blob'})
    .then(function (response) {
      return itkreadImageBlob(null, response.data, testImage3DPath)
      })
    .then(({ image: itkImage, webWorker }) => {
      webWorker.terminate()

      const imageData = vtkITKHelper.convertItkToVtkImage(itkImage)
      const viewer = createViewer(container, { image: imageData, rotate: false, viewerStyle: TEST_VIEWER_STYLE })
      return axios.get(testImage3DPath2, {responseType: 'blob'})
        .then(function (response) {
          return itkreadImageBlob(null, response.data, testImage3DPath2)
          })
        .then(({ image: itkImage, webWorker }) => {
          webWorker.terminate()

          const imageData = vtkITKHelper.convertItkToVtkImage(itkImage)
          viewer.setImage(imageData)
          const viewProxy = viewer.getViewProxy();
          const renderWindow = viewProxy.getOpenglRenderWindow()
          // Consistent baseline image size for regression testing
          renderWindow.setSize(600, 600)
          const representation = viewProxy.getRepresentations()[0];
          const volumeMapper = representation.getMapper();
          viewer.renderLater()
          viewer.captureImage().then((screenshot) => {
            testUtils.compareImages(screenshot, [createViewerSetImageBaseline], 'Test createViewer.setImage', t, 1.0, gc.releaseResources)
        })

        })
    })
})

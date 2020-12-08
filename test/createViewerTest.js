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
  t.plan(31)

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
  viewer.setUICollapsed(false)
  let collapsed = viewer.getUICollapsed()
  t.equal(collapsed, false, 'setUICollapsed false')
  viewer.setUICollapsed(true)
  collapsed = viewer.getUICollapsed()
  t.equal(collapsed, true, 'setUICollapsed true')

  const bgColor = [0.7, 0.2, 0.8]
  viewer.once('backgroundColorChanged', data => {
    t.pass('backgroundColorChanged event')
  })
  viewer.setBackgroundColor(bgColor)
  const resultBGColor = viewer.getBackgroundColor()
  t.same(resultBGColor, bgColor, 'background color')

  viewer.setUnits('mm')
  const resultUnits = viewer.getUnits()
  t.same(resultUnits, 'mm', 'units')

  // skip for screenshot consistency
  //viewer.once('toggleRotate', data => {
  //t.pass('toggleRotate event')
  //})
  //viewer.setRotateEnabled(true)
  //const resultRotate = viewer.getRotateEnabled()
  //t.same(resultRotate, true, 'rotate')
  //viewer.setRotateEnabled(false)

  viewer.once('toggleAnnotations', data => {
    t.pass('toggleAnnotations event')
  })
  viewer.setAnnotationsEnabled(false)
  const resultAnnotations = viewer.getAnnotationsEnabled()
  t.same(resultAnnotations, false, 'annotations')
  viewer.setAnnotationsEnabled(true)

  viewer.once('toggleAxes', data => {
    t.pass('toggleAxes event')
  })
  viewer.setAxesEnabled(true)
  const resultAxes = viewer.getAxesEnabled()
  t.same(resultAxes, true, 'axes')
  viewer.setAxesEnabled(false)

  viewer.once('toggleInterpolation', data => {
    t.pass('toggleInterpolation event')
  })
  viewer.setInterpolationEnabled(false)
  const resultInterpolation = viewer.getInterpolationEnabled()
  t.same(resultInterpolation, false, 'interpolation')
  viewer.setInterpolationEnabled(true)

  viewer.once('viewModeChanged', data => {
    t.pass('viewModeChanged event')
  })
  viewer.setViewMode('XPlane')
  const resultViewMode = viewer.getViewMode()
  t.same(resultViewMode, 'XPlane', 'view mode')
  viewer.setViewMode('Volume')

  const firstLayer = viewer.getLayerNames()[0]
  t.same(firstLayer, 'Image', 'getLayerNames')

  viewer.once('toggleLayerVisibility', data => {
    t.pass('toggleLayerVisibility event')
  })
  viewer.setLayerVisibility(false, firstLayer)
  const resultLayerVisibility = viewer.getLayerVisibility(firstLayer)
  t.same(resultLayerVisibility, false, 'layer visibility')
  viewer.setLayerVisibility(true, firstLayer)

  viewer.once('imageVisualizedComponentChanged', data => {
    t.pass('imageVisualizedComponentChanged event')
  })
  viewer.setImageComponentVisibility(false, 0)
  const resultImageComponentVisibility = viewer.getImageComponentVisibility(0)
  t.same(resultImageComponentVisibility, false, 'image component visibility')
  viewer.setImageComponentVisibility(true, 0)

  const viewProxy = viewer.getViewProxy()
  const renderWindow = viewProxy.getOpenglRenderWindow()
  // Consistent baseline image size for regression testing
  renderWindow.setSize(600, 600)
  viewer.renderLater()
  setTimeout(async () => {
    viewer.once('imageColorRangeChanged', data => {
      t.pass('imageColorRangeChanged event')
    })
    const oldRange = viewer.getImageColorRange(0)
    viewer.setImageColorRange([20, 80], 0)
    const resultImageColorRange = viewer.getImageColorRange(0)
    t.same(resultImageColorRange, [20, 80], 'image color range')
    viewer.setImageColorRange(oldRange, 0)

    viewer.once('imageColorRangeBoundsChanged', data => {
      t.pass('imageColorRangeBoundsChanged event')
    })
    const oldBounds = viewer.getImageColorRangeBounds(0)
    viewer.setImageColorRangeBounds([-20, 800], 0)
    const resultImageColorRangeBounds = viewer.getImageColorRangeBounds(0)
    t.same(resultImageColorRangeBounds, [-20, 800], 'image color range bounds')
    viewer.setImageColorRangeBounds(oldBounds, 0)

    viewer.once('imagePiecewiseFunctionGaussiansChanged', data => {
      t.pass('imagePiecewiseFunctionGaussiansChanged event')
    })
    const oldGaussians = viewer.getImagePiecewiseFunctionGaussians(0)
    const newGaussians = [
      { position: 0.3, height: 0.4, width: 0.5, xBias: 0.21, yBias: 0.6 },
    ]
    viewer.setImagePiecewiseFunctionGaussians(newGaussians, 0)
    const resultGaussians = viewer.getImagePiecewiseFunctionGaussians(0)
    t.same(resultGaussians, newGaussians, 'image piecewise function gaussians')
    viewer.setImagePiecewiseFunctionGaussians(oldGaussians, 0)

    viewer.once('toggleImageShadow', data => {
      t.pass('toggleImageShadow event')
    })
    viewer.setImageShadowEnabled(false)
    const resultImageShadowEnabled = viewer.getImageShadowEnabled()
    t.same(resultImageShadowEnabled, false, 'image shadow enabled')
    viewer.setImageShadowEnabled(true)

    viewer.once('imageGradientOpacityChanged', data => {
      t.pass('imageGradientOpacityChanged event')
    })
    viewer.setImageGradientOpacity(0.5)
    const resultImageGradientOpacity = viewer.getImageGradientOpacity()
    t.same(resultImageGradientOpacity, 0.5, 'image gradient opacity')
    viewer.setImageGradientOpacity(0.3)

    viewer.once('imageGradientOpacityScaleChanged', data => {
      t.pass('imageGradientOpacityScaleChanged event')
    })
    viewer.setImageGradientOpacityScale(0.8)
    const resultImageGradientOpacityScale = viewer.getImageGradientOpacityScale()
    t.same(resultImageGradientOpacityScale, 0.8, 'image gradient opacity scale')
    viewer.setImageGradientOpacity(0.5)

    t.pass('test completed')

    const screenshot = await viewer.captureImage()
    gc.releaseResources()
    testUtils.compareImages(
      screenshot,
      [createViewerBaseline],
      'Test createViewer',
      t,
      2.0,
      gc.releaseResources
    )
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

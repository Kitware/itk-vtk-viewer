import test from 'tape-catch'
import axios from 'axios'

import itkreadImageArrayBuffer from 'itk/readImageArrayBuffer'
import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import testUtils from 'vtk.js/Sources/Testing/testUtils'
import vtk from 'vtk.js/Sources/vtk'

import createViewer from '../src/createViewer'
import UserInterface from '../src/UserInterface'

const testImage3DPath = 'base/test/data/input/HeadMRVolume.nrrd'
const testLabelImage3DPath = 'base/test/data/input/HeadMRVolumeLabels.nrrd'
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

const baselineConfig = JSON.parse(
  '{"viewerConfigVersion":"0.2","xyLowerLeft":false,"containerStyle":{"position":"relative","width":"600px","height":"600px","minHeight":"600px","minWidth":"600px","maxHeight":"600px","maxWidth":"600px","margin":"0","padding":"0","top":"0","left":"0","overflow":"hidden"},"uiCollapsed":true,"main":{"backgroundColor":[0.7,0.2,0.8],"units":"mm"}}'
)

function makePointSet() {
  return vtk({
    vtkClass: 'vtkPolyData',
    points: {
      vtkClass: 'vtkPoints',
      name: '_points',
      numberOfComponents: 3,
      dataType: 'Float32Array',
      size: 2,
      values: new Float32Array([
        -0.44442534,
        -1.1349318,
        0.8388769,
        2.0538256,
        -1.9028517,
        0.71276945,
      ]),
    },
    verts: {
      vtkClass: 'vtkCellArray',
      name: '_verts',
      numberOfComponents: 1,
      dataType: 'Uint32Array',
      size: 4,
      values: new Uint16Array([1, 0, 1, 1]),
    },
  })
}

test('Test createViewer', async t => {
  const gc = testUtils.createGarbageCollector(t)
  t.plan(52)

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

  const labelResponse = await axios.get(testLabelImage3DPath, {
    responseType: 'arraybuffer',
  })
  const {
    image: itkLabelImage,
    webWorker: labelWebWorker,
  } = await itkreadImageArrayBuffer(null, labelResponse.data, 'data.nrrd')
  labelWebWorker.terminate()

  const viewer = await createViewer(viewerContainer, {
    image: itkImage,
    labelImage: itkLabelImage,
    rotate: false,
  })
  viewer.setContainerStyle(TEST_VIEWER_STYLE.containerStyle)
  viewer.setBackgroundColor(TEST_VIEWER_STYLE.backgroundColor)

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

  viewer.once('toggleImageInterpolation', data => {
    t.pass('toggleImageInterpolation event')
  })
  viewer.setImageInterpolationEnabled(false)
  const resultImageInterpolation = viewer.getImageInterpolationEnabled()
  t.same(resultImageInterpolation, false, 'interpolation')
  viewer.setImageInterpolationEnabled(true)

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

  viewer.selectLayer(firstLayer)

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

    viewer.once('imageColorMapChanged', data => {
      t.pass('imageColorMapChanged event')
    })
    const oldColorMap = viewer.getImageColorMap(0)
    viewer.setImageColorMap('2hot', 0)
    const resultImageColorMap = viewer.getImageColorMap(0)
    t.same(resultImageColorMap, '2hot', 'image color range')
    viewer.setImageColorMap(oldColorMap, 0)

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

    viewer.once('xSliceChanged', data => {
      t.pass('xSliceChanged event')
    })
    const oldXSlice = viewer.getXSlice()
    viewer.setXSlice(5)
    const resultXSlice = viewer.getXSlice()
    t.same(resultXSlice, 5, 'x slice')
    viewer.setXSlice(oldXSlice)

    viewer.once('ySliceChanged', data => {
      t.pass('ySliceChanged event')
    })
    const oldYSlice = viewer.getYSlice()
    viewer.setYSlice(5)
    const resultYSlice = viewer.getYSlice()
    t.same(resultYSlice, 5, 'y slice')
    viewer.setYSlice(oldYSlice)

    viewer.once('zSliceChanged', data => {
      t.pass('zSliceChanged event')
    })
    const oldZSlice = viewer.getZSlice()
    viewer.setZSlice(5)
    const resultZSlice = viewer.getZSlice()
    t.same(resultZSlice, 5, 'z slice')
    viewer.setZSlice(oldZSlice)

    viewer.once('imageVolumeSampleDistanceChanged', data => {
      t.pass('imageVolumeSampleDistanceChanged event')
    })
    viewer.setImageVolumeSampleDistance(0.5)
    const resultImageVolumeSampleDistance = viewer.getImageVolumeSampleDistance()
    t.same(resultImageVolumeSampleDistance, 0.5, 'volume sample distance')
    viewer.setImageVolumeSampleDistance(0.25)

    viewer.once('imageBlendModeChanged', data => {
      t.pass('imageBlendModeChanged event')
    })
    viewer.setImageBlendMode('Maximum')
    const resultImageBlendMode = viewer.getImageBlendMode()
    t.same(resultImageBlendMode, 'Maximum', 'blend mode')
    viewer.setImageBlendMode('Composite')

    viewer.once('labelImageLookupTableChanged', data => {
      t.pass('labelImageLookupTableChanged event')
    })
    const oldLookupTable = viewer.getLabelImageLookupTable()
    viewer.setLabelImageLookupTable('glasbey_warm')
    const resultLabelImageLookupTable = viewer.getLabelImageLookupTable()
    t.same(resultLabelImageLookupTable, 'glasbey_warm', 'image lookup table')
    viewer.setLabelImageLookupTable(oldLookupTable)

    viewer.once('labelImageBlendChanged', data => {
      t.pass('labelImageBlendChanged event')
    })
    viewer.setLabelImageBlend(0.8)
    const resultLabelImageBlend = viewer.getLabelImageBlend()
    t.same(resultLabelImageBlend, 0.8, 'label image blend')
    viewer.setLabelImageBlend(0.5)

    viewer.once('labelImageLabelNamesChanged', data => {
      t.pass('labelImageLabelNamesChanged event')
    })
    const labelNames = new Map([
      [0, 'background'],
      [1, 'brain'],
      [2, 'csf'],
    ])
    viewer.setLabelImageLabelNames(labelNames)
    const resultLabelImageLabelNames = viewer.getLabelImageLabelNames()
    t.same(resultLabelImageLabelNames, labelNames, 'label image label names')

    viewer.once('labelImageWeightsChanged', data => {
      t.pass('labelImageWeightsChanged event')
    })
    const labelWeights = new Map([
      [0, 0.1],
      [1, 0.5],
      [2, 0.9],
    ])
    viewer.setLabelImageWeights(labelWeights)
    const resultLabelImageWeights = viewer.getLabelImageWeights()
    t.same(resultLabelImageWeights, labelWeights, 'label image weights')

    const config = viewer.getConfig()
    //console.log('ViewerConfig', JSON.stringify(config))
    t.same(config, baselineConfig, 'get config')

    const points = makePointSet()
    await createViewer(viewerContainer, {
      pointSets: [points],
      rotate: false,
    })

    t.pass('test completed')

    gc.releaseResources()
    //testUtils.compareImages(
    //screenshot,
    //[createViewerBaseline],
    //'Test createViewer',
    //t,
    //2.0,
    //gc.releaseResources
    //)
  }, 100)
})

test('Test createViewer.setImage', async t => {
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

  const viewer = await createViewer(container, {
    image: itkImage,
    rotate: false,
  })
  viewer.setContainerStyle(TEST_VIEWER_STYLE.containerStyle)
  viewer.setBackgroundColor(TEST_VIEWER_STYLE.backgroundColor)
  const response2 = await axios.get(testImage3DPath2, {
    responseType: 'arraybuffer',
  })
  const {
    image: itkImage2,
    webWorker: webWorker2,
  } = await itkreadImageArrayBuffer(null, response2.data, 'data.nrrd')
  webWorker2.terminate()

  viewer.setImage(itkImage2)
  const viewProxy = viewer.getViewProxy()
  const renderWindow = viewProxy.getOpenglRenderWindow()
  // Consistent baseline image size for regression testing
  renderWindow.setSize(600, 600)
  const representation = viewProxy.getRepresentations()[0]
  const volumeMapper = representation.getMapper()
  viewer.renderLater()
  setTimeout(() => {
    viewer.captureImage().then(screenshot => {
      gc.releaseResources()
      //testUtils.compareImages(
      //screenshot,
      //[createViewerSetImageBaseline],
      //'Test createViewer.setImage',
      //t,
      //2.0,
      //gc.releaseResources
      //)
    }, 100)
  })
})

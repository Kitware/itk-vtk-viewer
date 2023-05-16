import test from 'tape-catch'
import axios from 'axios'

import { readImageArrayBuffer } from 'itk-wasm'
import testUtils from 'vtk.js/Sources/Testing/testUtils'
import vtk from 'vtk.js/Sources/vtk'

import createViewer from '../src/createViewer'
import './customElementsDefineOverride.js'
import referenceUIMachineOptions from '../src/UI/reference-ui'
import { MAX_CONCURRENCY } from '../src/Context/ViewerMachineContext'

const testImage3DPath = 'base/test/data/input/HeadMRVolume.nrrd'
const testLabelImage3DPath = 'base/test/data/input/HeadMRVolumeLabels.nrrd'
const test2ComponentImage3DPath =
  'base/test/data/input/HeadMRVolume2Components.nrrd'
const testImage3DPath2 = 'base/test/data/input/mri3D.nrrd'
const testImage2D = 'base/test/data/input/HeadMRVolume2DTop.nrrd'

// import createViewerBaseline from './data/baseline/createViewer.png'
// import createViewerSetImageBaseline from './data/baseline/createViewerSetImage.png'

const TEST_STYLE_RENDERING_VIEW_CONTAINER = {
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
  containerStyle: TEST_STYLE_RENDERING_VIEW_CONTAINER,
}

const baselineConfig = JSON.parse(
  `{"viewerConfigVersion":"0.3","uiMachineOptions":"reference","xyLowerLeft":false,"renderingViewContainerStyle":{"position":"relative","width":"600px","height":"600px","minHeight":"600px","minWidth":"600px","maxHeight":"600px","maxWidth":"600px","margin":"0","padding":"0","top":"0","left":"0","overflow":"hidden"},"uiCollapsed":true,"main":{"backgroundColor":[0.7,0.2,0.8],"units":"mm"},"maxConcurrency":${MAX_CONCURRENCY}}`
)

function makePointSet() {
  return vtk({
    vtkClass: 'vtkPolyData',
    points: {
      vtkClass: 'vtkPoints',
      name: '_points',
      numberOfComponents: 3,
      dataType: 'Float32Array',
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
  t.plan(61)

  const container = document.querySelector('body')
  const viewerContainer = gc.registerDOMElement(document.createElement('div'))
  container.appendChild(viewerContainer)

  const response = await axios.get(testImage3DPath, {
    responseType: 'arraybuffer',
  })
  const { image: itkImage, webWorker } = await readImageArrayBuffer(
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
  } = await readImageArrayBuffer(null, labelResponse.data, 'data.nrrd')
  labelWebWorker.terminate()

  const uiMachineOptions = { ...referenceUIMachineOptions }
  const originalCreateInterface =
    referenceUIMachineOptions.actions.createInterface
  function testCreateInterface(context) {
    t.pass('Modified uiMachineOptions')
    originalCreateInterface(context)
  }
  const testUIMachineActions = { ...uiMachineOptions.actions }
  testUIMachineActions.createInterface = testCreateInterface
  uiMachineOptions.actions = testUIMachineActions

  const GRADIENT_OPACITY = 0.1
  const viewer = await createViewer(viewerContainer, {
    image: itkImage,
    labelImage: itkLabelImage,
    rotate: false,
    gradientOpacity: GRADIENT_OPACITY,
    config: { uiMachineOptions },
  })
  viewer.setRenderingViewContainerStyle(TEST_VIEWER_STYLE.containerStyle)
  viewer.setBackgroundColor(TEST_VIEWER_STYLE.backgroundColor)

  const VALUE = 0.3
  viewer.setImageVolumeScatteringBlend(VALUE)
  t.equal(
    viewer.getImageVolumeScatteringBlend(),
    VALUE,
    'getImageVolumeScatteringBlend matches setImageVolumeScatteringBlend'
  )

  viewer.setUICollapsed(false)
  let collapsed = viewer.getUICollapsed()
  t.equal(collapsed, false, 'setUICollapsed false')
  viewer.setUICollapsed(true)
  collapsed = viewer.getUICollapsed()
  t.equal(collapsed, true, 'setUICollapsed true')
  t.equal(
    viewer.getImageGradientOpacity(),
    GRADIENT_OPACITY,
    'gradientOpacity set'
  )

  const bgColor = [0.7, 0.2, 0.8]
  viewer.once('backgroundColorChanged', () => {
    t.pass('backgroundColorChanged event')
  })
  viewer.setBackgroundColor(bgColor)
  const resultBGColor = viewer.getBackgroundColor()
  t.same(resultBGColor, bgColor, 'background color')

  viewer.setUnits('mm')
  const resultUnits = viewer.getUnits()
  t.same(resultUnits, 'mm', 'units')

  // skip for screenshot consistency
  //viewer.once('toggleRotate', () => {
  //t.pass('toggleRotate event')
  //})
  //viewer.setRotateEnabled(true)
  //const resultRotate = viewer.getRotateEnabled()
  //t.same(resultRotate, true, 'rotate')
  //viewer.setRotateEnabled(false)

  viewer.once('toggleAnnotations', () => {
    t.pass('toggleAnnotations event')
  })
  viewer.setAnnotationsEnabled(false)
  const resultAnnotations = viewer.getAnnotationsEnabled()
  t.same(resultAnnotations, false, 'annotations')
  viewer.setAnnotationsEnabled(true)

  viewer.once('toggleAxes', () => {
    t.pass('toggleAxes event')
  })
  viewer.setAxesEnabled(true)
  const resultAxes = viewer.getAxesEnabled()
  t.same(resultAxes, true, 'axes')
  viewer.setAxesEnabled(false)

  viewer.once('toggleImageInterpolation', () => {
    t.pass('toggleImageInterpolation event')
  })
  viewer.setImageInterpolationEnabled(false)
  const resultImageInterpolation = viewer.getImageInterpolationEnabled()
  t.same(resultImageInterpolation, false, 'interpolation')
  viewer.setImageInterpolationEnabled(true)

  viewer.once('viewModeChanged', () => {
    t.pass('viewModeChanged event')
  })
  viewer.setViewMode('XPlane')
  const resultViewMode = viewer.getViewMode()
  t.same(resultViewMode, 'XPlane', 'view mode')
  viewer.setViewMode('Volume')

  const firstLayer = viewer.getLayerNames()[0]
  t.same(firstLayer, 'Image', 'getLayerNames')

  viewer.once('toggleLayerVisibility', () => {
    t.pass('toggleLayerVisibility event')
  })
  viewer.setLayerVisibility(false, firstLayer)
  const resultLayerVisibility = viewer.getLayerVisibility(firstLayer)
  t.same(resultLayerVisibility, false, 'layer visibility')
  viewer.setLayerVisibility(true, firstLayer)

  viewer.selectLayer(firstLayer)

  viewer.once('imageVisualizedComponentChanged', () => {
    t.pass('imageVisualizedComponentChanged event')
  })
  viewer.setImageComponentVisibility(false, 0)
  const resultImageComponentVisibility = viewer.getImageComponentVisibility(0)
  t.same(resultImageComponentVisibility, false, 'image component visibility')
  viewer.setImageComponentVisibility(true, 0)

  viewer.setCroppingPlanesEnabled(true)
  t.same(viewer.getCroppingPlanesEnabled(), true, 'set cropping planes enabled')
  viewer.setCroppingPlanesEnabled(false)

  const [iMin, iMax, jMin, jMax, kMin, kMax] = [0, 3, 0, 3, 0, 3]
  const origin = [iMin, jMin, kMin]
  // opposite corner from origin
  const corner = [iMax, jMax, kMax]
  const planes = [
    // X min/max
    { normal: [1, 0, 0], origin },
    {
      normal: [-1, 0, 0],
      origin: corner,
    },
    // Y min/max
    { normal: [0, 1, 0], origin },
    {
      normal: [0, -1, 0],
      origin: corner,
    },
    // X min/max
    { normal: [0, 0, 1], origin },
    {
      normal: [0, 0, -1],
      origin: corner,
    },
  ]
  viewer.setCroppingPlanes(planes)
  t.same(viewer.getCroppingPlanes(), planes, 'set cropping planes ')

  // handle non 6 array of planes
  const plane = [{ normal: [1, 0, 0], origin }]
  viewer.setCroppingPlanes(plane)

  viewer.resetCroppingPlanes()
  t.notSame(viewer.getCroppingPlanes(), plane, 'reset cropping planes ')

  const viewProxy = viewer.getViewProxy()
  const renderWindow = viewProxy.getOpenGLRenderWindow()
  // Consistent baseline image size for regression testing
  renderWindow.setSize(600, 600)
  viewer.render()
  setTimeout(async () => {
    viewer.once('imageColorRangeChanged', () => {
      t.pass('imageColorRangeChanged event')
    })
    const oldRange = viewer.getImageColorRange(0)
    viewer.setImageColorRange([20, 80], 0)
    const resultImageColorRange = viewer.getImageColorRange(0)
    t.same(resultImageColorRange, [20, 80], 'image color range')
    viewer.setImageColorRange(oldRange, 0)

    viewer.once('imageColorRangeBoundsChanged', () => {
      t.pass('imageColorRangeBoundsChanged event')
    })
    const oldBounds = viewer.getImageColorRangeBounds(0)
    viewer.setImageColorRangeBounds([-20, 800], 0)
    const resultImageColorRangeBounds = viewer.getImageColorRangeBounds(0)
    t.same(resultImageColorRangeBounds, [-20, 800], 'image color range bounds')
    viewer.setImageColorRangeBounds(oldBounds, 0)

    viewer.once('imageColorMapChanged', () => {
      t.pass('imageColorMapChanged event')
    })
    const oldColorMap = viewer.getImageColorMap(0)
    viewer.setImageColorMap('2hot', 0)
    const resultImageColorMap = viewer.getImageColorMap(0)
    t.same(resultImageColorMap, '2hot', 'image color range')
    viewer.setImageColorMap(oldColorMap, 0)

    viewer.once('imagePiecewiseFunctionGaussiansChanged', () => {
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

    viewer.once('imagePiecewiseFunctionPointsChanged', () => {
      t.pass('imagePiecewiseFunctionPointsChanged event')
    })
    const newPoints = [
      [0, 0],
      [0.5, 0.5],
      [1, 1],
    ]
    viewer.setImagePiecewiseFunctionPoints(newPoints, 0)
    const resultPoints = viewer.getImagePiecewiseFunctionPoints(0)
    t.same(resultPoints, newPoints, 'image piecewise function points')

    viewer.once('toggleImageShadow', () => {
      t.pass('toggleImageShadow event')
    })
    viewer.setImageShadowEnabled(false)
    const resultImageShadowEnabled = viewer.getImageShadowEnabled()
    t.same(resultImageShadowEnabled, false, 'image shadow enabled')
    viewer.setImageShadowEnabled(true)

    viewer.once('imageGradientOpacityChanged', () => {
      t.pass('imageGradientOpacityChanged event')
    })
    viewer.setImageGradientOpacity(0.5)
    const resultImageGradientOpacity = viewer.getImageGradientOpacity()
    t.same(resultImageGradientOpacity, 0.5, 'image gradient opacity')
    viewer.setImageGradientOpacity(0.3)

    viewer.once('imageGradientOpacityScaleChanged', () => {
      t.pass('imageGradientOpacityScaleChanged event')
    })
    viewer.setImageGradientOpacityScale(0.8)
    const resultImageGradientOpacityScale = viewer.getImageGradientOpacityScale()
    t.same(resultImageGradientOpacityScale, 0.8, 'image gradient opacity scale')
    viewer.setImageGradientOpacity(0.5)

    viewer.once('xSliceChanged', () => {
      t.pass('xSliceChanged event')
    })
    const oldXSlice = viewer.getXSlice()
    viewer.setXSlice(5)
    const resultXSlice = viewer.getXSlice()
    t.same(resultXSlice, 5, 'x slice')
    viewer.setXSlice(oldXSlice)

    viewer.once('ySliceChanged', () => {
      t.pass('ySliceChanged event')
    })
    const oldYSlice = viewer.getYSlice()
    viewer.setYSlice(5)
    const resultYSlice = viewer.getYSlice()
    t.same(resultYSlice, 5, 'y slice')
    viewer.setYSlice(oldYSlice)

    viewer.once('zSliceChanged', () => {
      t.pass('zSliceChanged event')
    })
    const oldZSlice = viewer.getZSlice()
    viewer.setZSlice(5)
    const resultZSlice = viewer.getZSlice()
    t.same(resultZSlice, 5, 'z slice')
    viewer.setZSlice(oldZSlice)

    viewer.once('imageVolumeSampleDistanceChanged', () => {
      t.pass('imageVolumeSampleDistanceChanged event')
    })
    viewer.setImageVolumeSampleDistance(0.5)
    const resultImageVolumeSampleDistance = viewer.getImageVolumeSampleDistance()
    t.same(resultImageVolumeSampleDistance, 0.5, 'volume sample distance')
    viewer.setImageVolumeSampleDistance(0.25)

    viewer.once('imageBlendModeChanged', () => {
      t.pass('imageBlendModeChanged event')
    })
    viewer.setImageBlendMode('Maximum')
    const resultImageBlendMode = viewer.getImageBlendMode()
    t.same(resultImageBlendMode, 'Maximum', 'blend mode')
    viewer.setImageBlendMode('Composite')

    viewer.once('labelImageLookupTableChanged', () => {
      t.pass('labelImageLookupTableChanged event')
    })
    const oldLookupTable = viewer.getLabelImageLookupTable()
    viewer.setLabelImageLookupTable('glasbey_warm')
    const resultLabelImageLookupTable = viewer.getLabelImageLookupTable()
    t.same(resultLabelImageLookupTable, 'glasbey_warm', 'image lookup table')
    viewer.setLabelImageLookupTable(oldLookupTable)

    viewer.once('labelImageBlendChanged', () => {
      t.pass('labelImageBlendChanged event')
    })
    viewer.setLabelImageBlend(0.8)
    const resultLabelImageBlend = viewer.getLabelImageBlend()
    t.same(resultLabelImageBlend, 0.8, 'label image blend')
    viewer.setLabelImageBlend(0.5)

    viewer.once('labelImageLabelNamesChanged', () => {
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

    viewer.once('labelImageWeightsChanged', () => {
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
    t.same(config, baselineConfig, 'get config')

    viewer.setImageScale(0)
    t.same(true, true, 'setImageScale did not error')

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
  }, 10000)
})

test('Test createViewer.setImage', async t => {
  const gc = testUtils.createGarbageCollector(t)

  const container = document.querySelector('body')
  const viewerContainer = gc.registerDOMElement(document.createElement('div'))
  container.appendChild(viewerContainer)

  const response = await axios.get(testImage3DPath, {
    responseType: 'arraybuffer',
  })
  const { image: itkImage, webWorker } = await readImageArrayBuffer(
    null,
    response.data,
    'data.nrrd'
  )
  webWorker.terminate()

  const viewer = await createViewer(container, {
    image: itkImage,
    rotate: false,
  })
  viewer.setRenderingViewContainerStyle(TEST_VIEWER_STYLE.containerStyle)
  viewer.setBackgroundColor(TEST_VIEWER_STYLE.backgroundColor)
  const response2 = await axios.get(testImage3DPath2, {
    responseType: 'arraybuffer',
  })
  const {
    image: itkImage2,
    webWorker: webWorker2,
  } = await readImageArrayBuffer(null, response2.data, 'data.nrrd')
  webWorker2.terminate()

  viewer.setImage(itkImage2)
  const viewProxy = viewer.getViewProxy()
  const renderWindow = viewProxy.getOpenGLRenderWindow()
  // Consistent baseline image size for regression testing
  renderWindow.setSize(600, 600)
  const representation = viewProxy.getRepresentations()[0]
  /*const volumeMapper = */ representation.getMapper()
  viewer.render()
  setTimeout(() => {
    viewer.captureImage().then(
      (/*screenshot*/) => {
        gc.releaseResources()
        //testUtils.compareImages(
        //screenshot,
        //[createViewerSetImageBaseline],
        //'Test createViewer.setImage',
        //t,
        //2.0,
        //gc.releaseResources
        //)
      },
      100
    )
  })
})

test('Test createViewer with just labelImage', async t => {
  const gc = testUtils.createGarbageCollector(t)

  const container = document.querySelector('body')
  const viewerContainer = gc.registerDOMElement(document.createElement('div'))
  container.appendChild(viewerContainer)

  const response = await axios.get(testLabelImage3DPath, {
    responseType: 'arraybuffer',
  })
  const { image: labelImage, webWorker } = await readImageArrayBuffer(
    null,
    response.data,
    'data.nrrd'
  )
  webWorker.terminate()

  const viewer = await createViewer(container, {
    labelImage,
    rotate: false,
  })

  t.plan(1)
  viewer.once('renderedImageAssigned', () => {
    t.pass('createViewer did not crash with just labelImage')
    gc.releaseResources()
  })
})

// test('Test setImage and setLabelImage after createViewer', async t => {
//   const gc = testUtils.createGarbageCollector(t)

//   const container = document.querySelector('body')
//   const viewerContainer = gc.registerDOMElement(document.createElement('div'))
//   container.appendChild(viewerContainer)

//   const labelImageResponse = await axios.get(testLabelImage3DPath, {
//     responseType: 'arraybuffer',
//   })
//   const { image: labelImage, webWorker } = await readImageArrayBuffer(
//     null,
//     labelImageResponse.data,
//     'data.nrrd'
//   )
//   webWorker.terminate()

//   const imageResponse = await axios.get(testImage3DPath, {
//     responseType: 'arraybuffer',
//   })

//   const { image, webWorker: webWorkerForImage } = await readImageArrayBuffer(
//     null,
//     imageResponse.data,
//     'data.nrrd'
//   )
//   webWorkerForImage.terminate()

//   const viewer = await createViewer(container, {
//     rotate: false,
//   })

//   viewer.setImage(image)
//   viewer.setLabelImage(labelImage)

//   t.plan(1)
//   viewer.once('renderedImageAssigned', () => {
//     t.pass(
//       'createViewer did not crash with with late setImage and setLabelImage'
//     )
//     gc.releaseResources()
//   })
// })

// test('Test createViewer custom UI options', async t => {
//   const gc = testUtils.createGarbageCollector(t)

//   const container = document.querySelector('body')
//   const viewerContainer = gc.registerDOMElement(document.createElement('div'))
//   container.appendChild(viewerContainer)

//   const response = await axios.get(testImage3DPath, {
//     responseType: 'arraybuffer',
//   })
//   const { image: itkImage, webWorker } = await readImageArrayBuffer(
//     null,
//     response.data,
//     'data.nrrd'
//   )
//   webWorker.terminate()

//   const referenceUIUrl = new URL(
//     '/base/src/UI/reference-ui/dist/referenceUIMachineOptions.js',
//     document.location.origin
//   )
//   const referenceUIMachineOptionsHref = { href: referenceUIUrl.href }

//   await createViewer(container, {
//     image: itkImage,
//     rotate: false,
//     config: { uiMachineOptions: referenceUIMachineOptionsHref },
//   })
//   t.pass('Viewer with UI module URL')

//   await createViewer(container, {
//     image: itkImage,
//     rotate: false,
//     config: {
//       uiMachineOptions: { href: referenceUIUrl.href, export: 'default' },
//     },
//   })
//   t.pass('Viewer with UI module URL, explicit export')

//   // If missing image.service.scaleSelector in options, test there is no warning
//   // Avoids this later occurring Error: Unable to send event to child 'scaleSelector' from service 'images'
//   const uiMachineOptionsNoImageServices = {
//     ...referenceUIMachineOptions,
//     images: { ...referenceUIMachineOptions.images },
//   }
//   delete uiMachineOptionsNoImageServices.images.services

//   let isWarningLogged = false
//   const consoleWarn = console.warn
//   console.warn = message => {
//     if (message.includes("Warning: No service found for invocation '")) {
//       isWarningLogged = true
//     }
//   }
//   await createViewer(container, {
//     image: itkImage,
//     rotate: false,
//     config: {
//       uiMachineOptions: uiMachineOptionsNoImageServices,
//     },
//   })
//   console.warn = consoleWarn

//   t.same(
//     isWarningLogged,
//     false,
//     'custom options with no images.services has no warning'
//   )

//   gc.releaseResources()
// })

const makeImages = async paths => {
  return Promise.all(
    paths.map(async path => {
      const response = await axios.get(path, {
        responseType: 'arraybuffer',
      })
      const { image, webWorker } = await readImageArrayBuffer(
        null,
        response.data,
        'data.nrrd'
      )
      webWorker.terminate()
      return image
    })
  )
}

test('Test createViewer setCompareImage with checkerboard', async t => {
  const gc = testUtils.createGarbageCollector(t)

  const container = document.querySelector('body')
  const viewerContainer = gc.registerDOMElement(document.createElement('div'))
  container.appendChild(viewerContainer)

  const [image, fixedImage] = await makeImages([
    testImage3DPath,
    testLabelImage3DPath,
  ])

  const viewer = await createViewer(container, {
    rotate: false,
  })
  viewer.setImage(fixedImage, 'fixed')
  await viewer.setImage(image, 'moving')
  const compareOptions = {
    method: 'checkerboard',
    pattern: [10, 5, 2],
  }
  viewer.setCompareImages('fixed', 'moving', compareOptions)

  t.plan(1)
  viewer.once('renderedImageAssigned', () => {
    const { method } = viewer.getCompareImages('moving')

    t.same(method, compareOptions.method, 'compare method matches')
    gc.releaseResources()
  })
})

test('Test createViewer setCompareImage with checkerboard and 2 component image', async t => {
  const gc = testUtils.createGarbageCollector(t)

  const container = document.querySelector('body')
  const viewerContainer = gc.registerDOMElement(document.createElement('div'))
  container.appendChild(viewerContainer)

  const [image, fixedImage] = await makeImages([
    testImage3DPath,
    test2ComponentImage3DPath,
  ])

  const viewer = await createViewer(container, {
    fixedImage,
    rotate: false,
  })
  await viewer.setImage(image, 'moving')
  const compareOptions = {
    method: 'checkerboard',
    pattern: [10, 5, 2],
  }
  viewer.setCompareImages('Fixed', 'moving', compareOptions)

  t.plan(1)
  viewer.once('renderedImageAssigned', () => {
    t.pass(
      'createViewer did not crash right after setFixedImage and setCheckerboard'
    )
    gc.releaseResources()
  })
})

test('Test setCompareImage with checkerboard and 2D image', async t => {
  const gc = testUtils.createGarbageCollector(t)

  const container = document.querySelector('body')
  const viewerContainer = gc.registerDOMElement(document.createElement('div'))
  container.appendChild(viewerContainer)

  const [image, fixedImage] = await makeImages([testImage2D, testImage2D])

  const compareOptions = {
    method: 'checkerboard',
  }
  const viewer = await createViewer(container, {
    image,
    fixedImage,
    compare: compareOptions,
    rotate: false,
  })
  t.plan(1)
  viewer.once('renderedImageAssigned', () => {
    // first rendered image is just the image, not the fused compare image
    viewer.once('renderedImageAssigned', () => {
      t.pass('createViewer did not crash right after compare.')
      gc.releaseResources()
    })
  })
})

test('Test cyan-magenta compare', async t => {
  const gc = testUtils.createGarbageCollector(t)

  const container = document.querySelector('body')
  const viewerContainer = gc.registerDOMElement(document.createElement('div'))
  container.appendChild(viewerContainer)

  const [image, fixedImage] = await makeImages([
    testImage3DPath,
    test2ComponentImage3DPath,
  ])

  const viewer = await createViewer(container, {
    fixedImage,
    rotate: false,
  })
  await viewer.setImage(image, 'moving')
  const compareOptions = {
    method: 'cyan-magenta',
  }
  viewer.setCompareImages('Fixed', 'moving', compareOptions)

  t.plan(1)
  viewer.once('renderedImageAssigned', () => {
    t.pass('createViewer did not crash right after compare.')
    gc.releaseResources()
  })
})

test('Test blend compare', async t => {
  const gc = testUtils.createGarbageCollector(t)

  const container = document.querySelector('body')
  const viewerContainer = gc.registerDOMElement(document.createElement('div'))
  container.appendChild(viewerContainer)

  const [image, fixedImage] = await makeImages([testImage2D, testImage2D])
  const compareOptions = {
    method: 'blend',
    imageMix: 0.25,
  }
  const viewer = await createViewer(container, {
    image,
    fixedImage,
    compare: compareOptions,
    rotate: false,
  })

  t.plan(1)
  viewer.once('renderedImageAssigned', () => {
    t.pass('createViewer did not crash right after compare.')
    gc.releaseResources()
  })
})

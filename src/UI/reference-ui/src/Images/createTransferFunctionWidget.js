import vtkMouseRangeManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseRangeManipulator'
import vtkItkPiecewiseGaussianWidget from '../vtk/ItkPiecewiseGaussianWidget'
import macro from '@kitware/vtk.js/macro'

import style from '../ItkVtkViewer.module.css'

function createTransferFunctionWidget(context, imagesUIGroup) {
  const transferFunctionWidget = vtkItkPiecewiseGaussianWidget.newInstance({
    numberOfBins: 256,
    size: [400, 150],
  })
  context.images.transferFunctionWidget = transferFunctionWidget
  transferFunctionWidget.setEnableRangeZoom(true)
  let iconSize = 20
  if (context.use2D) {
    iconSize = 0
  }
  transferFunctionWidget.updateStyle({
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    histogramColor: 'rgba(30, 30, 30, 0.6)',
    strokeColor: 'rgb(0, 0, 0)',
    activeColor: 'rgb(255, 255, 255)',
    handleColor: 'rgb(70, 70, 150)',
    buttonDisableFillColor: 'rgba(255, 255, 255, 0.5)',
    buttonDisableStrokeColor: 'rgba(0, 0, 0, 0.5)',
    buttonStrokeColor: 'rgba(0, 0, 0, 1)',
    buttonFillColor: 'rgba(255, 255, 255, 1)',
    strokeWidth: 2,
    activeStrokeWidth: 3,
    buttonStrokeWidth: 1.5,
    handleWidth: 2,
    zoomControlHeight: 20,
    zoomControlColor: 'rgba(50, 50, 100, 1)',
    iconSize, // Can be 0 if you want to remove buttons (dblClick for (+) / rightClick for (-))
    padding: 10,
  })

  const piecewiseWidgetContainer = document.createElement('div')
  piecewiseWidgetContainer.setAttribute('class', style.piecewiseWidget)

  transferFunctionWidget.setContainer(piecewiseWidgetContainer)
  transferFunctionWidget.bindMouseListeners()

  // Create color map and piecewise function objects as needed
  if (typeof context.images.lookupTableProxies === 'undefined') {
    context.images.lookupTableProxies = new Map()
  }

  // Manage update when opacity changes
  transferFunctionWidget.onAnimation(start => {
    if (start) {
      context.service.send({
        type: 'REQUEST_ANIMATION',
        data: 'transferFunctionWidget',
      })
    } else {
      context.service.send({
        type: 'CANCEL_ANIMATION',
        data: 'transferFunctionWidget',
      })
    }
  })

  transferFunctionWidget.onOpacityChange(() => {
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const component = actorContext.selectedComponent
    const dataRange = actorContext.colorRanges.get(component)
    const range = transferFunctionWidget.getOpacityRange(dataRange)
    const nodes = transferFunctionWidget.getOpacityNodes(dataRange)
    context.service.send({
      type: 'IMAGE_PIECEWISE_FUNCTION_CHANGED',
      data: {
        name,
        component,
        range,
        nodes,
      },
    })
  })

  const onZoomChange = zoom => {
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const component = actorContext.selectedComponent
    const fullRange = actorContext.colorRanges.get(component)
    const diff = fullRange[1] - fullRange[0]
    const colorRange = new Array(2)
    colorRange[0] = fullRange[0] + zoom[0] * diff
    colorRange[1] = fullRange[0] + zoom[1] * diff
    context.service.send({
      type: 'IMAGE_COLOR_RANGE_CHANGED',
      data: { name, component, range: colorRange },
    })
  }
  transferFunctionWidget.onZoomChange(macro.throttle(onZoomChange, 150))

  const transferFunctionWidgetRow = document.createElement('div')
  transferFunctionWidgetRow.setAttribute('class', style.uiRow)
  // This row needs background different from normal uiRows, to aid
  // in the illusion that it's the content portion of a tabbed pane
  transferFunctionWidgetRow.setAttribute(
    'style',
    'background: rgba(127, 127, 127, 0.5);'
  )
  transferFunctionWidgetRow.appendChild(piecewiseWidgetContainer)
  imagesUIGroup.appendChild(transferFunctionWidgetRow)

  // Create range manipulator
  const rangeManipulator = vtkMouseRangeManipulator.newInstance({
    button: 1,
    alt: true,
  })
  context.images.transferFunctionManipulator = {
    rangeManipulator: null,
    windowMotionScale: 150.0,
    levelMotionScale: 150.0,
    windowGet: null,
    windowSet: null,
    levelGet: null,
    levelSet: null,
  }
  context.images.transferFunctionManipulator.rangeManipulator = rangeManipulator

  // Window
  const windowGet = () => {
    const gaussian = transferFunctionWidget.getGaussians()[0]
    return (
      gaussian.width *
      context.images.transferFunctionManipulator.windowMotionScale
    )
  }
  context.images.transferFunctionManipulator.windowGet = windowGet
  const windowSet = value => {
    const gaussians = transferFunctionWidget.getGaussians()
    const newGaussians = gaussians.slice()
    newGaussians[0].width =
      value / context.images.transferFunctionManipulator.windowMotionScale
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const component = context.images.selectedComponent
    context.service.send({
      type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
      data: { name, component, gaussians: newGaussians },
    })
  }
  context.images.transferFunctionManipulator.windowSet = windowSet

  // Level
  const levelGet = () => {
    const gaussian = transferFunctionWidget.getGaussians()[0]
    return (
      gaussian.position *
      context.images.transferFunctionManipulator.levelMotionScale
    )
  }
  context.images.transferFunctionManipulator.levelGet = levelGet
  const levelSet = value => {
    const gaussians = transferFunctionWidget.getGaussians()
    const newGaussians = gaussians.slice()
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const component = context.images.selectedComponent
    context.service.send({
      type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
      data: { name, component, gaussians: newGaussians },
    })
  }
  context.images.transferFunctionManipulator.levelSet = levelSet

  // Add range manipulator
  context.itkVtkView
    .getInteractorStyle2D()
    .addMouseManipulator(rangeManipulator)
  context.itkVtkView
    .getInteractorStyle3D()
    .addMouseManipulator(rangeManipulator)

  const pwfRangeManipulator = vtkMouseRangeManipulator.newInstance({
    button: 3, // Right mouse
    alt: true,
  })
  const pwfRangeManipulatorShift = vtkMouseRangeManipulator.newInstance({
    button: 1, // Left mouse
    shift: true, // For the macOS folks
    alt: true,
  })

  const pwfMotionScale = 200.0
  const pwfGet = () => {
    const gaussian = transferFunctionWidget.getGaussians()[0]
    return gaussian.height * pwfMotionScale
  }
  const pwfSet = value => {
    const gaussians = transferFunctionWidget.getGaussians()
    const newGaussians = gaussians.slice()
    newGaussians[0].height = value / pwfMotionScale
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const component = context.images.selectedComponent
    context.service.send({
      type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
      data: { name, component, gaussians: newGaussians },
    })
  }
  pwfRangeManipulator.setVerticalListener(0, pwfMotionScale, 1, pwfGet, pwfSet)
  pwfRangeManipulatorShift.setVerticalListener(
    0,
    pwfMotionScale,
    1,
    pwfGet,
    pwfSet
  )
  context.itkVtkView
    .getInteractorStyle3D()
    .addMouseManipulator(pwfRangeManipulator)
  context.itkVtkView
    .getInteractorStyle3D()
    .addMouseManipulator(pwfRangeManipulatorShift)
}

export default createTransferFunctionWidget

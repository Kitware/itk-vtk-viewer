import vtkMouseRangeManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseRangeManipulator'
import vtkGestureCameraManipulator from '@kitware/vtk.js/Interaction/Manipulators/GestureCameraManipulator'

const MIN_WINDOW = 1e-8
const MIN_WIDTH = 1e-8

const clampX = ([x, y]) => [Math.min(1, Math.max(0, x)), y]

export const createTransferFunctionManipulators = context => (
  callback,
  onReceive
) => {
  const getPoints = () => {
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const component = actorContext.selectedComponent
    return actorContext.piecewiseFunctionPoints.get(component)
  }

  const setPoints = points => {
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const component = actorContext.selectedComponent
    context.service.send({
      type: 'IMAGE_PIECEWISE_FUNCTION_POINTS_CHANGED',
      data: {
        name,
        component,
        points,
      },
    })
  }

  const getXMinMax = () => {
    const xPositions = getPoints().map(([x]) => x)
    return { min: Math.min(...xPositions), max: Math.max(...xPositions) }
  }

  const windowGet = () => {
    const { min, max } = getXMinMax()
    const width = max - min
    return width
  }

  const windowSet = newWidth => {
    const { min, max } = getXMinMax()
    const width = max - min || MIN_WIDTH
    const newMin = (min + max) / 2 - newWidth / 2

    const newPoints = getPoints()
      // normalize in old range, then scale to new range
      .map(([x, y]) => [((x - min) / width) * newWidth + newMin, y])
      .map(clampX)
    setPoints(newPoints)
  }

  const levelGet = () => {
    const { min, max } = getXMinMax()
    return (min + max) / 2
  }

  const levelSet = newLevel => {
    const oldLevel = levelGet()
    const delta = newLevel - oldLevel
    const newPoints = getPoints()
      // normalize in old range, then scale to new range
      .map(([x, y]) => [x + delta, y])
      .map(clampX)
    setPoints(newPoints)
  }

  // window/level
  const rangeManipulator = vtkMouseRangeManipulator.newInstance({
    button: 1,
    alt: true,
  })

  const pwfGet = () => {
    const opacities = getPoints().map(([, y]) => y)
    return Math.max(...opacities)
  }
  const pwfSet = newMaxOpacity => {
    const oldMax = pwfGet()
    const delta = newMaxOpacity - oldMax
    const newPoints = getPoints().map(([x, y]) => [x, Math.min(y + delta, 1)])
    setPoints(newPoints)
  }
  // opacity up/down
  const pwfRangeManipulator = vtkMouseRangeManipulator.newInstance({
    button: 3, // Right mouse
    alt: true,
  })
  const pwfRangeManipulatorShift = vtkMouseRangeManipulator.newInstance({
    button: 1, // Left mouse
    shift: true, // For the macOS folks
    alt: true,
  })

  const gestureManipulator = vtkGestureCameraManipulator.newInstance({
    pinchEnabled: true,
    rotateEnabled: true,
    panEnabled: true,
  })

  // max as 1.01 not 1.0 to allow for squishing of low function points if a point is already at 1
  pwfRangeManipulator.setVerticalListener(0, 1.01, 0.01, pwfGet, pwfSet)
  pwfRangeManipulatorShift.setVerticalListener(0, 1.01, 0.01, pwfGet, pwfSet)
  ;[
    rangeManipulator,
    pwfRangeManipulator,
    pwfRangeManipulatorShift,
    gestureManipulator,
  ].forEach(m => {
    if (m.isA('vtkGestureCameraManipulator')) {
      context.itkVtkView.getInteractorStyle2D().addGestureManipulator(m)
      context.itkVtkView.getInteractorStyle3D().addGestureManipulator(m)
    } else {
      context.itkVtkView.getInteractorStyle2D().addMouseManipulator(m)
      context.itkVtkView.getInteractorStyle3D().addMouseManipulator(m)
    }
  })

  const applyColorRange = (context, event) => {
    const name = event.data.name
    const component = event.data.component
    const actorContext = context.images.actorContext.get(name)

    if (
      name !== context.images.selectedName ||
      component !== actorContext.selectedComponent
    ) {
      return
    }

    const colorRange = event.data.range

    let fullRange = colorRange
    if (actorContext.colorRangeBounds.has(component)) {
      fullRange = actorContext.colorRangeBounds.get(component)
    }
    const diff = fullRange[1] - fullRange[0]

    const colorRangeNormalized = [
      (colorRange[0] - fullRange[0]) / diff,
      (colorRange[1] - fullRange[0]) / diff,
    ]
    const normDelta = colorRangeNormalized[1] - colorRangeNormalized[0]
    const steps = normDelta / 100.0

    // level
    rangeManipulator.setHorizontalListener(
      colorRangeNormalized[0],
      colorRangeNormalized[1],
      steps,
      levelGet,
      levelSet
    )

    // window
    rangeManipulator.setVerticalListener(
      MIN_WINDOW,
      normDelta,
      steps,
      windowGet,
      windowSet
    )
  }

  onReceive(event => {
    const { type } = event
    if (
      type === 'SELECT_IMAGE_COMPONENT' ||
      type === 'IMAGE_COLOR_RANGE_CHANGED'
    ) {
      const name = event.data.name
      const actorContext = context.images.actorContext.get(name)
      const component = event.data.component
      if (
        actorContext.selectedComponent === component &&
        actorContext.colorRanges.has(component)
      ) {
        const range = actorContext.colorRanges.get(component)
        applyColorRange(context, {
          data: {
            name,
            component,
            range,
          },
        })
      }
    }
  })
}

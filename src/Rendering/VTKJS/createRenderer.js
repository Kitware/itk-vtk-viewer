import vtkGestureCameraManipulator from 'vtk.js/Sources/Interaction/Manipulators/GestureCameraManipulator'
import createMainRenderer from './Main/createMainRenderer'

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import 'vtk.js/Sources/Rendering/Profiles/Geometry'
import 'vtk.js/Sources/Rendering/Profiles/Glyph'
import 'vtk.js/Sources/Rendering/Profiles/Volume'

function createRenderer(context) {
  context.itkVtkView.setContainer(context.renderingViewContainers.get('volume'))
  context.itkVtkView.setXyLowerLeft(context.xyLowerLeft)

  createMainRenderer(context)

  const interactor = context.itkVtkView.getInteractor()
  interactor.onRenderEvent(() => context.service.send('POST_RENDER'))

  const gestureManipulator = vtkGestureCameraManipulator.newInstance({
    pinchEnabled: true,
    rotateEnabled: true,
    panEnabled: true,
  })
  context.itkVtkView
    .getInteractorStyle2D()
    .addGestureManipulator(gestureManipulator)
  context.itkVtkView
    .getInteractorStyle3D()
    .addGestureManipulator(gestureManipulator)
}

export default createRenderer

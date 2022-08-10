import { getCropWidgetBounds } from './croppingPlanes'

function resetCamera(context) {
  context.itkVtkView.resetCamera(getCropWidgetBounds(context))
}

export default resetCamera

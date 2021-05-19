import macro from 'vtk.js/Sources/macro'
import vtkImageCroppingWidget from 'vtk.js/Sources/Widgets/Widgets3D/ImageCroppingWidget'
import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData'
import vtkBoundingBox from 'vtk.js/Sources/Common/DataModel/BoundingBox'

import toggleCroppingPlanes from './toggleCroppingPlanes'

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import 'vtk.js/Sources/Rendering/Profiles/Geometry'
import 'vtk.js/Sources/Rendering/Profiles/Glyph'
import 'vtk.js/Sources/Rendering/Profiles/Volume'

function createMainRenderer(context) {
  const croppingWidget = vtkImageCroppingWidget.newInstance()
  context.main.croppingWidget = croppingWidget
  context.itkVtkView.addWidgetToRegister(croppingWidget)
  //context.images.croppingWidget.setHandleSize(16)
  croppingWidget.setFaceHandlesEnabled(false)
  croppingWidget.setEdgeHandlesEnabled(false)
  croppingWidget.setCornerHandlesEnabled(true)

  context.main.croppingVirtualImage = vtkImageData.newInstance()
  context.main.croppingBoundingBox = [...vtkBoundingBox.INIT_BOUNDS]

  //   -  //context.images.representationProxy.setCroppingPlanes(planes)
  //

  const cropState = croppingWidget.getWidgetState().getCroppingPlanes()
  cropState.onModified(
    macro.debounce(() => {
      const planeIndices = cropState.getPlanes()
      //const boundBoxCorners =
      //* -  //const bboxCorners =
      //*    context.images.croppingWidget.planesToBBoxCorners(
      //*
      context.service.send({
        type: 'CROPPING_PLANES_CHANGED',
        data: { planeIndices, boundBoxCorners },
      })
    }, 100)
  )
  toggleCroppingPlanes(context)
}

export default createMainRenderer

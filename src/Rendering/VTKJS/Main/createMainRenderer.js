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

  // These are helper objects to bridge datasets in the scene, images,
  // geometry, and points sets, the croppingPlanes, and the
  // ImageCroppingWidget.
  //
  // The croppingVirtualImage is used to set the worldToIndex transform and
  // indexToWorld transform with imageCroppingWidget.copyImageDataDescription.
  //
  // The Direction of the virtual image is set to the Direction of the
  // imagesMachineContext.selectedName's Direction.
  //
  // The Origin of the virtual image is set to the lower left of the
  // croppingBoundingBox
  //
  // The Spacing of the virtual image is set to the spacing of the selected
  // image, if one exists, otherwise the extent of the croppingBoundingBox /
  // 1000 (is there a better approach for this?).
  //
  // The Size of the virtualimage is such that it reaches the upper right
  // corner of the croppingBoundingBox.
  //
  // The croppingBoundingBox is an axis-aligned bounding box that encapsulates all
  // objects in the scene.
  //
  context.main.croppingVirtualImage = vtkImageData.newInstance()
  context.main.croppingBoundingBox = [...vtkBoundingBox.INIT_BOUNDS]

  // Todo: Initialize croppingVirtualImage, croppingBoundingBox, based on the
  // main.croppingPlanes context, if present.
  //
  croppingWidget.copyImageDataDescription(context.main.croppingVirtualImage)

  const cropState = croppingWidget.getWidgetState().getCroppingPlanes()
  console.log(cropState)
  console.log(
    croppingWidget
      .getWidgetState()
      .getCroppingPlanes()
      .getPlanes()
  )
  console.log(
    croppingWidget
      .getWidgetState()
      .getCroppingPlanes()
      .getBounds()
  )
  console.log(
    croppingWidget
      .getWidgetState()
      .getCroppingPlanes()
      .getBoundsByReference()
  )
  cropState.onModified(
    macro.debounce(() => {
      const planeIndices = cropState.getPlanes()
      //const boundBoxCorners =
      //* -  //const bboxCorners =
      //*    context.images.croppingWidget.planesToBBoxCorners(
      //*
      //context.service.send({
      //type: 'CROPPING_PLANES_CHANGED',
      //data: { planeIndices, boundBoxCorners },
      //})
    }, 100)
  )
  toggleCroppingPlanes(context)
}

export default createMainRenderer

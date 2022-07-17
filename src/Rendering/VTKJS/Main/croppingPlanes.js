import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData'
import { transformVec3 } from 'vtk.js/Sources/Widgets/Widgets3D/ImageCroppingWidget/helpers'
import vtkMath from 'vtk.js/Sources/Common/Core/Math'
import vtkPlane from 'vtk.js/Sources/Common/DataModel/Plane'
import vtkBoundingBox from 'vtk.js/Sources/Common/DataModel/BoundingBox'

import toggleCroppingPlanes from './toggleCroppingPlanes'
import HandlesInPixelsImageCroppingWidget from '../Widgets/HandlesInPixelsImageCroppingWidget'

export function createCropping(context) {
  const croppingWidget = HandlesInPixelsImageCroppingWidget.newInstance()
  context.main.croppingWidget = croppingWidget
  context.main.widgetCroppingPlanes = Array.from({ length: 6 }, () =>
    vtkPlane.newInstance()
  )
  context.itkVtkView.addWidgetToRegister(croppingWidget)

  croppingWidget
    .getWidgetState()
    .getStatesWithLabel('handles')
    .forEach(h => h.setScale1(18))
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
  // The Size of the virtual image is such that it reaches the upper right
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

  const cropState = croppingWidget.getWidgetState().getCroppingPlanes()
  cropState.onModified(() => {
    const prop = context.itkVtkView.getWidgetProp(context.main.croppingWidget)
    if (prop && prop.getEnabled()) {
      const indexes = cropState.getPlanes()

      const indexToWorld = context.main.croppingVirtualImage.getIndexToWorld()
      const direction = context.main.croppingVirtualImage.getDirection()
      const croppingPlanes = [
        {
          origin: Array.from(
            transformVec3([indexes[0], indexes[2], indexes[4]], indexToWorld)
          ),
          normal: Array.from(direction.slice(0, 3)),
        },
        {
          origin: Array.from(
            transformVec3([indexes[1], indexes[3], indexes[5]], indexToWorld)
          ),
          normal: vtkMath.multiplyScalar(Array.from(direction.slice(0, 3)), -1),
        },
        {
          origin: Array.from(
            transformVec3([indexes[0], indexes[2], indexes[4]], indexToWorld)
          ),
          normal: Array.from(direction.slice(3, 6)),
        },
        {
          origin: Array.from(
            transformVec3([indexes[1], indexes[3], indexes[5]], indexToWorld)
          ),
          normal: vtkMath.multiplyScalar(Array.from(direction.slice(3, 6)), -1),
        },
        {
          origin: Array.from(
            transformVec3([indexes[0], indexes[2], indexes[4]], indexToWorld)
          ),
          normal: Array.from(direction.slice(6, 9)),
        },
        {
          origin: Array.from(
            transformVec3([indexes[1], indexes[3], indexes[5]], indexToWorld)
          ),
          normal: vtkMath.multiplyScalar(Array.from(direction.slice(6, 9)), -1),
        },
      ]
      context.service.send({
        type: 'CROPPING_PLANES_CHANGED',
        data: croppingPlanes,
      })
    }
  })
  context.itkVtkView.setWidgetManagerInitializedCallback(() => {
    toggleCroppingPlanes(context)
  })
}

export function updateCroppingParameters(context, actor) {
  const {
    croppingBoundingBox: bbox,
    croppingVirtualImage,
    croppingWidget,
  } = context.main
  const actorBounds = [...actor.getBounds()]
  vtkBoundingBox.addBounds(bbox, actorBounds)
  croppingVirtualImage.setOrigin([bbox[0], bbox[2], bbox[4]])
  const spacing = croppingVirtualImage.getSpacing()
  croppingVirtualImage.setDimensions([
    (bbox[1] - bbox[0]) / spacing[0],
    (bbox[3] - bbox[2]) / spacing[1],
    (bbox[5] - bbox[4]) / spacing[2],
  ])

  const widgetState = croppingWidget.getWidgetState()
  widgetState.setIndexToWorldT(croppingVirtualImage.getIndexToWorld())
  widgetState.setWorldToIndexT(croppingVirtualImage.getWorldToIndex())

  if (!context.main.croppingPlanes) {
    const dims = croppingVirtualImage.getDimensions()
    const croppingPlanes = widgetState.getCroppingPlanes()
    croppingPlanes.setPlanes([0, dims[0], 0, dims[1], 0, dims[2]])
  }

  context.service.send('RESET_CROPPING_PLANES')
}

export function updateCroppingParametersFromImage(context, image) {
  const spacing = image.getSpacing().slice()
  const { croppingVirtualImage } = context.main
  croppingVirtualImage.setSpacing(spacing)
  croppingVirtualImage.setDirection(image.getDirection().slice())

  updateCroppingParameters(context, image)
}

export function addCroppingPlanes(context, actor) {
  const { widgetCroppingPlanes } = context.main
  const mapper = actor.getMapper()
  widgetCroppingPlanes.forEach(plane => {
    mapper.addClippingPlane(plane)
  })
}

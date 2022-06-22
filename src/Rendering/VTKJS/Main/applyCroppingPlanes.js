import vtkMath from 'vtk.js/Sources/Common/Core/Math'
import { transformVec3 } from 'vtk.js/Sources/Widgets/Widgets3D/ImageCroppingWidget/helpers'
import { updateSliceCroppingPlanes } from './croppingPlanes'

function applyCroppingPlanes(context, event) {
  if (event.data) {
    const planes = event.data

    planes.forEach((plane, idx) => {
      context.main.widgetCroppingPlanes[idx].setOriginFrom(plane.origin)
      context.main.widgetCroppingPlanes[idx].setNormalFrom(plane.normal)
      // context.main.widgetCroppingPlanesFlip[idx].setOriginFrom(plane.origin)
      // const flipped = vtkMath.multiplyScalar(Array.from(plane.normal), 1)
      // context.main.widgetCroppingPlanesFlip[idx].setNormalFrom(flipped)
    })
    updateSliceCroppingPlanes(context, planes)

    // update widget
    const worldToIndex = context.main.croppingVirtualImage.getWorldToIndex()
    const cropIndexes = context.main.croppingWidget
      .getWidgetState()
      .getCroppingPlanes()
      .getPlanes()
    const newCropIndexes = new Array(6)
    let index = transformVec3(planes[0].origin, worldToIndex)
    newCropIndexes[0] = index[0]
    index = transformVec3(planes[1].origin, worldToIndex)
    newCropIndexes[1] = index[0]
    index = transformVec3(planes[2].origin, worldToIndex)
    newCropIndexes[2] = index[1]
    index = transformVec3(planes[3].origin, worldToIndex)
    newCropIndexes[3] = index[1]
    index = transformVec3(planes[4].origin, worldToIndex)
    newCropIndexes[4] = index[2]
    index = transformVec3(planes[5].origin, worldToIndex)
    newCropIndexes[5] = index[2]
    if (!vtkMath.areEquals(cropIndexes, newCropIndexes, 1e-8)) {
      context.main.croppingWidget
        .getWidgetState()
        .getCroppingPlanes()
        .setPlanes(newCropIndexes)
    }

    context.service.send('RENDER')
  }
}

export default applyCroppingPlanes

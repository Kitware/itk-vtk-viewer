import vtkMath from 'vtk.js/Sources/Common/Core/Math'
import { transformVec3 } from 'vtk.js/Sources/Widgets/Widgets3D/ImageCroppingWidget/helpers'
import { updateSliceCroppingPlanes } from './croppingPlanes'

function applyCroppingPlanes(context, event) {
  if (event.data) {
    const planes = event.data

    planes.forEach((plane, idx) => {
      context.main.widgetCroppingPlanes[idx].setOriginFrom(plane.origin)
      context.main.widgetCroppingPlanes[idx].setNormalFrom(plane.normal)
    })
    updateSliceCroppingPlanes(context, planes)

    // update widget
    if (planes.length === 6) {
      const worldToIndex = context.main.croppingVirtualImage.getWorldToIndex()
      const cropIndexes = context.main.croppingWidget
        .getWidgetState()
        .getCroppingPlanes()
        .getPlanes()
      const newCropIndexes = planes
        .map(({ origin }) => transformVec3(origin, worldToIndex))
        .map((ijk, idx) => ijk[Math.trunc(idx / 2)]) // index is 0, 0, 1, 1, 2, 2
      if (!vtkMath.areEquals(cropIndexes, newCropIndexes, 1e-8)) {
        context.main.croppingWidget
          .getWidgetState()
          .getCroppingPlanes()
          .setPlanes(newCropIndexes)
      }
    }

    context.service.send('RENDER')
  }
}

export default applyCroppingPlanes

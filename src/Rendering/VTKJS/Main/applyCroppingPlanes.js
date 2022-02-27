import vtkMath from 'vtk.js/Sources/Common/Core/Math'
import { transformVec3 } from 'vtk.js/Sources/Widgets/Widgets3D/ImageCroppingWidget/helpers'

function applyCroppingPlanes(context, event) {
  if (event.data) {
    const planes = event.data
    console.log('planes', planes)
    planes.forEach((plane, idx) => {
      context.main.widgetCroppingPlanes[idx].setOriginFrom(plane.center)
      context.main.widgetCroppingPlanes[idx].setNormalFrom(plane.normal)
      context.main.widgetCroppingPlanesFlip[idx].setOriginFrom(plane.center)
      const flipped = vtkMath.multiplyScalar(Array.from(plane.normal), 1)
      //console.log('flip', plane.normal, flipped)
      context.main.widgetCroppingPlanesFlip[idx].setNormalFrom(flipped)
    })
    const worldToIndex = context.main.croppingVirtualImage.getWorldToIndex()
    const cropIndexes = context.main.croppingWidget
      .getWidgetState()
      .getCroppingPlanes()
      .getPlanes()
    const newCropIndexes = new Array(6)
    let index = transformVec3(planes[0].center, worldToIndex)
    newCropIndexes[0] = index[0]
    index = transformVec3(planes[1].center, worldToIndex)
    newCropIndexes[1] = index[0]
    index = transformVec3(planes[2].center, worldToIndex)
    newCropIndexes[2] = index[1]
    index = transformVec3(planes[3].center, worldToIndex)
    newCropIndexes[3] = index[1]
    index = transformVec3(planes[4].center, worldToIndex)
    newCropIndexes[4] = index[2]
    index = transformVec3(planes[5].center, worldToIndex)
    newCropIndexes[5] = index[2]
    if (!vtkMath.areEquals(cropIndexes, newCropIndexes, 1e-8)) {
      context.main.croppingWidget
        .getWidgetState()
        .getCroppingPlanes()
        .setPlanes(newCropIndexes)
    }
    const volumeMapper = context.images.representationProxy.getMapper()
    if (volumeMapper) {
      volumeMapper.modified()
    }
    const sliceActors = context.images.representationProxy.getActors()
    sliceActors.forEach(actor => {
      actor.modified()
      const clippingPlanes = actor.getMapper().getClippingPlanes()
      clippingPlanes.forEach(p => {
        console.log('center', p.getOrigin())
        console.log('normal', p.getNormal())
      })
    })
    context.service.send('RENDER')
  }
}

export default applyCroppingPlanes

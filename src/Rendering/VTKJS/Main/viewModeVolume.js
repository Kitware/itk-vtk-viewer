function viewModeVolume(context) {
  context.itkVtkView.setViewMode('Volume')

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    const slicingPlanes = context.main.slicingPlanes
    volumeRep.setXSliceVisibility(slicingPlanes.x.visible)
    volumeRep.setYSliceVisibility(slicingPlanes.y.visible)
    volumeRep.setZSliceVisibility(slicingPlanes.z.visible)
    volumeRep.setVolumeVisibility(true)
    context.service.send('RENDER')
  }
}

export default viewModeVolume

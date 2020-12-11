function viewModeZPlane(context) {
  context.itkVtkView.setViewMode('ZPlane')

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    volumeRep.setXSliceVisibility(false)
    volumeRep.setYSliceVisibility(false)
    volumeRep.setZSliceVisibility(true)
    volumeRep.setVolumeVisibility(false)
    context.service.send('RENDER')
  }
}

export default viewModeZPlane

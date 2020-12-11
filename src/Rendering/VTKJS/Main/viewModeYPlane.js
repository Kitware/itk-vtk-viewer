function viewModeYPlane(context) {
  context.itkVtkView.setViewMode('YPlane')

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    volumeRep.setXSliceVisibility(false)
    volumeRep.setYSliceVisibility(true)
    volumeRep.setZSliceVisibility(false)
    volumeRep.setVolumeVisibility(false)
    context.service.send('RENDER')
  }
}

export default viewModeYPlane

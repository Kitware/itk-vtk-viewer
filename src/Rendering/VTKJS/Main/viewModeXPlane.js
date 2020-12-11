function viewModeXPlane(context) {
  context.itkVtkView.setViewMode('XPlane')

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    volumeRep.setXSliceVisibility(true)
    volumeRep.setYSliceVisibility(false)
    volumeRep.setZSliceVisibility(false)
    volumeRep.setVolumeVisibility(false)
    context.service.send('RENDER')
  }
}

export default viewModeXPlane

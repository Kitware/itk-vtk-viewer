function applyZSlice(context, event) {
  const position = event.data

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    volumeRep.setZSlice(Number(position))
    context.service.send('RENDER_LATER')
  }
}

export default applyZSlice

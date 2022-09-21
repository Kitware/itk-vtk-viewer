function applyYSlice(context, event) {
  const position = event.data

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    volumeRep.setYSlice(Number(position))
    context.service.send('RENDER_LATER')
  }
}

export default applyYSlice

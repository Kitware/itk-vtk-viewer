function applyXSlice(context, event) {
  const position = event.data

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    volumeRep.setXSlice(Number(position))
    context.service.send('RENDER')
  }
}

export default applyXSlice

function applyBlendMode(context, event) {
  const name = event.data.name
  const blendMode = event.data.blendMode

  const blendModeLower = blendMode.toLowerCase()
  switch (blendModeLower) {
    case 'composite':
      context.images.blendModeSelector.value = 0
      if (!context.use2D) {
        context.images.volumeRow1.style.display = 'flex'
      }
      break
    case 'maximum':
      context.images.blendModeSelector.value = 1
      context.images.volumeRow1.style.display = 'none'
      break
    case 'minimum':
      context.images.blendModeSelector.value = 2
      context.images.volumeRow1.style.display = 'none'
      break
    case 'average':
      context.images.blendModeSelector.value = 3
      context.images.volumeRow1.style.display = 'none'
      break
    default:
      throw new Error(`Invalid blend mode: ${blendMode}`)
  }
}

export default applyBlendMode

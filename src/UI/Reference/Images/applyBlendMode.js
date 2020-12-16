function applyBlendMode(context, event) {
  const name = event.data.name
  const blendMode = event.data.blendMode

  const blendModeLower = blendMode.toLowerCase()
  switch (blendModeLower) {
    case 'composite':
      context.images.blendModeSelector.value = 0
      break
    case 'maximum':
      context.images.blendModeSelector.value = 1
      break
    case 'minimum':
      context.images.blendModeSelector.value = 2
      break
    case 'average':
      context.images.blendModeSelector.value = 3
      break
    default:
      throw new Error(`Invalid blend mode: ${blendMode}`)
  }
}

export default applyBlendMode

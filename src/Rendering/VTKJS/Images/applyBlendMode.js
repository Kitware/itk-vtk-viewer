function applyBlendMode(context, event) {
  const name = event.data.name
  const blendMode = event.data.blendMode

  if (!!context.images.representationProxy) {
    const volumeMapper = context.images.representationProxy.getMapper()
    const blendModeLower = blendMode.toLowerCase()
    switch (blendModeLower) {
      case 'composite':
        volumeMapper.setBlendMode(0)
        break
      case 'maximum':
        volumeMapper.setBlendMode(1)
        break
      case 'minimum':
        volumeMapper.setBlendMode(2)
        break
      case 'average':
        volumeMapper.setBlendMode(3)
        break
      default:
        throw new Error(`Invalid blend mode: ${blendMode}`)
    }
    context.service.send('RENDER')
  }
}

export default applyBlendMode

function applyColorRange(context, e) {
  const {
    data: { component, range },
  } = e
  if (!context.images.colorTransferFunctions) {
    return
  }
  const colorTransferFunction = context.images.colorTransferFunctions.get(
    component
  )
  colorTransferFunction.setMappingRange(range[0], range[1])
  colorTransferFunction.updateRange()

  context.service.send('RENDER')
}

export default applyColorRange

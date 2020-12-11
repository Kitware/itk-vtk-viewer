function applyYSlice(context, event) {
  const position = event.data

  const yPlaneLabel = context.main.yPlaneLabel

  const numberOfValueChars = 6
  const valueString = String(position).substring(0, numberOfValueChars)
  const padLength =
    valueString.length < numberOfValueChars
      ? numberOfValueChars - valueString.length
      : 0
  const pad = '&nbsp;'.repeat(padLength)
  yPlaneLabel.innerHTML = `Y: ${pad}${valueString}`
  context.main.ySliceElement.value = position
}

export default applyYSlice

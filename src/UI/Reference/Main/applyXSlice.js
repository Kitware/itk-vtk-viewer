function applyXSlice(context, event) {
  const position = event.data

  const xPlaneLabel = context.main.xPlaneLabel

  const numberOfValueChars = 6
  const valueString = String(position).substring(0, numberOfValueChars)
  const padLength =
    valueString.length < numberOfValueChars
      ? numberOfValueChars - valueString.length
      : 0
  const pad = '&nbsp;'.repeat(padLength)
  xPlaneLabel.innerHTML = `X: ${pad}${valueString}`
  context.main.xSliceElement.value = position
}

export default applyXSlice

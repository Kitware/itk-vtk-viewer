function applyZSlice(context, event) {
  const position = event.data

  const zPlaneLabel = context.main.zPlaneLabel

  const numberOfValueChars = 6
  const valueString = String(position).substring(0, numberOfValueChars)
  const padLength =
    valueString.length < numberOfValueChars
      ? numberOfValueChars - valueString.length
      : 0
  const pad = '&nbsp;'.repeat(padLength)
  zPlaneLabel.innerHTML = `Z: ${pad}${valueString}`
  context.main.zSliceElement.value = position
}

export default applyZSlice

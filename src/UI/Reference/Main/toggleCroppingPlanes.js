function toggleCroppingPlanes(context) {
  if (context.main.cropButtonInput) {
    context.main.cropButtonInput.checked = context.main.croppingPlanesEnabled
  }
}

export default toggleCroppingPlanes

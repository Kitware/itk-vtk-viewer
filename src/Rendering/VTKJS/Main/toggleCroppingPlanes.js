function toggleCroppingPlanes(context) {
  context.main.croppingWidget.setVisibility(context.main.croppingPlanesEnabled)
  context.service.send('RENDER')
}

export default toggleCroppingPlanes

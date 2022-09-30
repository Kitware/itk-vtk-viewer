function toggleCroppingPlanes(context) {
  const enabled = context.main.croppingPlanesEnabled
  const prop = context.itkVtkView.getWidgetProp(context.main.croppingWidget)
  // Only available after the widget manager has been initialized
  if (prop) {
    prop.setEnabled(enabled)
    if (enabled) {
      context.itkVtkView.getWidgetManager().enablePicking()

      // Keep handles visible at all angles with fixed directional light in cinematic mode
      prop.getRepresentations().forEach(rep => {
        rep.getActors().forEach(actor => {
          actor.getProperty().setAmbient(1)
        })
      })
    }
  }
  context.main.croppingWidget.setVisibility(enabled)
  context.service.send('RENDER')
}

export default toggleCroppingPlanes

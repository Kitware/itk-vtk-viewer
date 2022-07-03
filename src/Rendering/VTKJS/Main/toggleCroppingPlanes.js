function toggleCroppingPlanes(context) {
  const enabled = context.main.croppingPlanesEnabled
  const prop = context.itkVtkView.getWidgetProp(context.main.croppingWidget)
  // Only available after the widget manager has been initialized
  if (prop) {
    prop.setEnabled(enabled)
    if (enabled) {
      context.itkVtkView.getWidgetManager().enablePicking()
    }
  }
  context.main.croppingWidget.setVisibility(enabled)
  context.service.send('RENDER')
}

export default toggleCroppingPlanes

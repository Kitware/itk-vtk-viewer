function toggleCroppingPlanes(context) {
  const enabled = context.main.croppingPlanesEnabled
  context.main.croppingWidget.setVisibility(enabled)
  const prop = context.itkVtkView.getWidgetProp(context.main.croppingWidget)
  // Only available after the widget manager has been initialized
  if (prop) {
    prop.setEnabled(enabled)
    if (enabled) {
      context.itkVtkView.getWidgetManager().grabFocus(prop)
      context.itkVtkView.getWidgetManager().enablePicking()
    }
  }
}

export default toggleCroppingPlanes

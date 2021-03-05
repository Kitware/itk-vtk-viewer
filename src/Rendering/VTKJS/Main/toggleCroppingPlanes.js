function toggleCroppingPlanes(context) {
  const enabled = context.main.croppingPlanesEnabled
  context.main.croppingWidget.setVisibility(enabled)
  if (enabled) {
    const prop = context.itkVtkView.getWidgetProp(context.main.croppingWidget)
    if (prop) {
      context.itkVtkView.getWidgetManager().grabFocus(prop)
    }
    //console.log(context.itkVtkView.getWidgetProp(context.main.croppingWidget))
    //console.log(context.itkVtkView.getWidgetManager())
  }
  //context.service.send('RENDER')
}

export default toggleCroppingPlanes

import DistanceWidget from './DistanceWidget/DistanceWidget'

let valueChangedSubscription

function toggleDistanceWidget(context) {
  const {
    widgets: { distanceWidget },
  } = context
  const widgetManager = context.itkVtkView.getWidgetManager()
  if (context.widgets.distanceEnabled) {
    const distanceWidget = DistanceWidget.newInstance()
    context.widgets.distanceWidget = distanceWidget
    widgetManager.addWidget(distanceWidget)

    valueChangedSubscription = distanceWidget
      .getWidgetState()
      .onModified(() => {
        context.service.send({
          type: 'DISTANCE_WIDGET_VALUE_CHANGED',
          data: distanceWidget.getDistance().toFixed(3),
        })
      })

    widgetManager.grabFocus(distanceWidget)

    // Avoid appearing under the x slice
    const firstSlice = context.images.representationProxy.getActors()[0]
    const xCoord = firstSlice.getBoundsForSlice()[0]
    distanceWidget.getManipulator().setHandleOrigin([xCoord, 0, 0])
  } else {
    valueChangedSubscription.unsubscribe()
    widgetManager.removeWidget(distanceWidget)
    distanceWidget.delete()

    context.service.send({
      type: 'DISTANCE_WIDGET_VALUE_CHANGED',
      data: 0,
    })
  }

  context.service.send('RENDER')
}

export default toggleDistanceWidget

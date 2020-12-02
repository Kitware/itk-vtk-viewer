import * as vtkMath from 'vtk.js/Sources/Common/Core/Math'

function toggleDistanceWidget(context) {
  if (context.widgets.distanceEnabled) {
    context.widgets.distanceWidget.setEnabled(true)
    context.widgets.distanceWidget.onInteractionEvent(() => {
      const distanceRep = context.widgets.distanceRepresentation
      const distancePoint1 = distanceRep.getPoint1WorldPosition()
      const distancePoint2 = distanceRep.getPoint2WorldPosition()
      const p1Position = distancePoint1
      const p2Position = distancePoint2
      const delta = Math.sqrt(
        vtkMath.distance2BetweenPoints(p1Position, p2Position)
      ).toFixed(3)
      context.service.send({
        type: 'DISTANCE_WIDGET_VALUE_CHANGED',
        data: delta,
      })
    })
    if (context.widgets.distanceValue === 0.0) {
      context.widgets.distanceWidget.setWidgetStateToStart()
    }
  } else {
    context.widgets.distanceWidget.setEnabled(false)
  }

  context.service.send('RENDER')
}

export default toggleDistanceWidget

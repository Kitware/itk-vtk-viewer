import vtkDistanceWidget from 'vtk.js/Sources/Interaction/Widgets/DistanceWidget'
import vtkDistanceRepresentation from 'vtk.js/Sources/Interaction/Widgets/DistanceRepresentation'

function createDistanceWidget(context, event) {
  context.widgets.distanceWidget = vtkDistanceWidget.newInstance()
  context.widgets.distanceWidget.setInteractor(
    context.itkVtkView.getInteractor()
  )

  const distanceRep = vtkDistanceRepresentation.newInstance()
  context.widgets.distanceRepresentation = distanceRep
  context.widgets.distanceWidget.setWidgetRep(distanceRep)

  // Need three decimal places, not two
  distanceRep.setNumberOfDecimals(3)
  distanceRep.getLineProperty().setColor(1, 1, 1)
  distanceRep.getEndPointProperty().setColor(1, 1, 1)
  distanceRep.getEndPoint2Property().setColor(1, 1, 1)
  context.widgets.distanceWidget.setEnabled(context.widgets.distanceEnabled)
}

export default createDistanceWidget

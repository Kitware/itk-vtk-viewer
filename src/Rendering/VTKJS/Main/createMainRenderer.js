import macro from 'vtk.js/Sources/macro'
import vtkImageCroppingWidget from 'vtk.js/Sources/Widgets/Widgets3D/ImageCroppingWidget'

function createMainRenderer(context) {
  context.main.croppingWidget = vtkImageCroppingWidget.newInstance()
  //context.images.croppingWidget.setHandleSize(16)
  //context.images.croppingWidget.setFaceHandlesEnabled(false)
  //context.images.croppingWidget.setEdgeHandlesEnabled(false)
  //context.images.croppingWidget.setCornerHandlesEnabled(true)
  //context.images.croppingWidget.setInteractor(
  //context.itkVtkView.getInteractor()
  //)
  //context.images.croppingWidget.setEnabled(false)
  //context.images.croppingWidget.setVolumeMapper(
  //context.images.representationProxy.getMapper()
  //)
  //context.images.addCroppingPlanesChangedHandler = handler => {
  //eventEmitter.on('croppingPlanesChanged', handler)
  //function unsubscribe() {
  //eventEmitter.off('croppingPlanesChanged', handler)
  //}
  //return Object.freeze({ unsubscribe })
  //}
  //let croppingUpdateInProgress = false
  //const setCroppingPlanes = () => {
  //if (croppingUpdateInProgress) {
  //return
  //}
  //croppingUpdateInProgress = true
  //const planes = context.images.croppingWidget.getWidgetState().planes
  //context.images.representationProxy.setCroppingPlanes(planes)
  //const bboxCorners = context.images.croppingWidget.planesToBBoxCorners(
  //planes
  //)
  //eventEmitter.emit('croppingPlanesChanged', planes, bboxCorners)
  //croppingUpdateInProgress = false
  //}
  //const debouncedSetCroppingPlanes = macro.debounce(setCroppingPlanes, 100)
  //context.images.croppingWidget.onCroppingPlanesChanged(
  //debouncedSetCroppingPlanes
  //)
}

export default createMainRenderer

import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction'
import applyCategoricalColorToLookupTableProxy from './../UserInterface/applyCategoricalColorToLookupTableProxy'

function createLabelMapRendering(store) {
  const numberOfComponents = store.imageUI.numberOfComponents

  // label map initialization
  const lutProxy = vtkLookupTableProxy.newInstance()
  store.imageUI.labelMapLookupTableProxy = lutProxy

  const labelMapScalars = store.imageUI.labelMap.getPointData().getScalars()
  const labelMapData = labelMapScalars.getData()
  const uniqueLabelsSet = new Set(labelMapData)
  const uniqueLabels = Array.from(uniqueLabelsSet)
  // The volume mapper currently only supports ColorTransferFunction's,
  // not LookupTable's
  // lut.setAnnotations(uniqueLabels, uniqueLabels);
  uniqueLabels.sort()
  store.imageUI.labelMapLabels = uniqueLabels

  applyCategoricalColorToLookupTableProxy(
    lutProxy,
    uniqueLabels,
    store.imageUI.labelMapCategoricalColor
  )

  const volume = store.imageUI.representationProxy.getVolumes()[0]
  const volumeProperty = volume.getProperty()

  const piecewiseFunction = vtkPiecewiseFunction.newInstance()
  store.imageUI.piecewiseFunction = piecewiseFunction
  const offset = 0.0
  const maxOpacity = 0.1
  const haveBackground = uniqueLabels[0] === 0 ? true : false
  if (haveBackground) {
    piecewiseFunction.addPoint(uniqueLabels[0] - offset, 0.0, 0.5, 1.0)
  } else {
    piecewiseFunction.addPoint(uniqueLabels[0] - offset, maxOpacity, 0.5, 1.0)
  }
  piecewiseFunction.addPoint(uniqueLabels[1] - offset, maxOpacity, 0.5, 1.0)
  piecewiseFunction.addPoint(
    uniqueLabels[uniqueLabels.length - 1] + offset,
    maxOpacity,
    0.5,
    1.0
  )
  volumeProperty.setScalarOpacity(numberOfComponents, piecewiseFunction)

  const colorTransferFunction = lutProxy.getLookupTable()
  colorTransferFunction.setMappingRange(
    uniqueLabels[0],
    uniqueLabels[uniqueLabels.length - 1]
  )

  volumeProperty.setRGBTransferFunction(
    numberOfComponents,
    colorTransferFunction
  )
  // volumeProperty.setUseGradientOpacity(numberOfComponents, false);
  volumeProperty.setIndependentComponents(true)

  // The slice shows the same lut as the volume for label map
  const sliceActors = store.imageUI.representationProxy.getActors()
  sliceActors.forEach(actor => {
    const actorProp = actor.getProperty()
    actorProp.setIndependentComponents(true)
    actorProp.setRGBTransferFunction(numberOfComponents, colorTransferFunction)
  })
}

export default createLabelMapRendering

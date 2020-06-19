import { observable } from 'mobx'

import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction'
import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'
import applyCategoricalColorToLookupTableProxy from './../UserInterface/applyCategoricalColorToLookupTableProxy'
import updateLabelMapPiecewiseFunction from './updateLabelMapPiecewiseFunction'

function numericalSort(eltA, eltB) {
  if (eltA < eltB) {
    return -1
  } else if (eltB < eltA) {
    return 1
  }
  return 0
}

function createLabelMapRendering(store) {
  const numberOfComponents = store.imageUI.numberOfComponents
  store.itkVtkView.setLabelIndex(numberOfComponents)

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
  uniqueLabels.sort(numericalSort)
  store.imageUI.labelMapLabels = uniqueLabels
  if (!!!store.itkVtkView.getLabelNames()) {
    const labelNames = new Map()
    for (let index = 0; index < uniqueLabels.length; index++) {
      const label = uniqueLabels[index]
      labelNames.set(label, label.toString())
    }
    store.itkVtkView.setLabelNames(labelNames)
  }

  const labelMapWeights = new Array(uniqueLabels.length)
  labelMapWeights.fill(1.0)
  if (uniqueLabels[0] === 0) {
    // 0 is usually the background label -- suppress it
    labelMapWeights[0] = 0.1
  }
  store.imageUI.labelMapWeights = observable.array(labelMapWeights)

  applyCategoricalColorToLookupTableProxy(
    lutProxy,
    uniqueLabels,
    store.imageUI.labelMapLookupTable
  )

  const volume = store.imageUI.representationProxy.getVolumes()[0]
  const volumeProperty = volume.getProperty()

  const piecewiseFunction = vtkPiecewiseFunction.newInstance()
  store.imageUI.piecewiseFunction = piecewiseFunction

  updateLabelMapPiecewiseFunction(store)

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

  volumeProperty.setIndependentComponents(true)
  volumeProperty.setOpacityMode(numberOfComponents, OpacityMode.PROPORTIONAL)

  // The slice shows the same lut as the volume for label map
  const sliceActors = store.imageUI.representationProxy.getActors()
  sliceActors.forEach(actor => {
    const actorProp = actor.getProperty()
    actorProp.setIndependentComponents(true)
    actorProp.setRGBTransferFunction(numberOfComponents, colorTransferFunction)
    actorProp.setPiecewiseFunction(numberOfComponents, piecewiseFunction)
  })
}

export default createLabelMapRendering

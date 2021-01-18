import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction'

import transformLabelImageWeight from './transformLabelImageWeight'

function applyLabelImageWeights(context, event) {
  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)
  const labelImageWeights = actorContext.labelImageWeights

  let piecewiseFunction = null
  if (!context.images.piecewiseFunctions.has('labelImage')) {
    piecewiseFunction = vtkPiecewiseFunction.newInstance()
    context.images.piecewiseFunctions.set('labelImage', piecewiseFunction)
  } else {
    piecewiseFunction = context.images.piecewiseFunctions.get('labelImage')
  }

  console.log('label image weights', labelImageWeights)
  const maxOpacity = 1.0
  const haveBackground =
    labelImageWeights.keys().next().value === 0 ? true : false
  let minLabelWeight = 0.0
  let maxLabelWeight = 1.0
  if (!actorContext.image) {
    maxLabelWeight = 0.05
    if (context.main.viewMode !== 'Volume') {
      maxLabelWeight = 1.0
      minLabelWeight = 0.4
    }
  }

  piecewiseFunction.removeAllPoints()

  const weightIter = labelImageWeights.entries()
  let entry = weightIter.next()
  if (haveBackground) {
    piecewiseFunction.addPointLong(0, 0.0, 0.5, 1.0)
  } else {
    piecewiseFunction.addPointLong(
      entry.value[0],
      transformLabelImageWeight(entry.value[1], minLabelWeight, maxLabelWeight),
      0.5,
      1.0
    )
  }

  while (!entry.done) {
    piecewiseFunction.addPointLong(
      entry.value[0],
      transformLabelImageWeight(entry.value[1], minLabelWeight, maxLabelWeight),
      0.5,
      1.0
    )
    entry = weightIter.next()
  }

  console.log('piecewiseFunction', piecewiseFunction.getState())

  const volume = context.images.representationProxy.getVolumes()[0]
  const volumeProperty = volume.getProperty()

  const component = actorContext.visualizedComponents.length - 1
  console.log('COPMONENTS', component)
  volumeProperty.setScalarOpacity(component, piecewiseFunction)

  // The slice shows the same piecewise function as the volume for label map
  const sliceActors = context.images.representationProxy.getActors()
  sliceActors.forEach(actor => {
    const actorProp = actor.getProperty()
    actorProp.setPiecewiseFunction(component, piecewiseFunction)
  })

  console.log(name, volume, volumeProperty)

  context.service.send('RENDER')
}

export default applyLabelImageWeights

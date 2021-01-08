import vtkPiecewiseFunctionProxy from 'vtk.js/Sources/Proxy/Core/PiecewiseFunctionProxy'

import transformLabelImageWeight from './transformLabelImageWeight'

import updateLabelImagePiecewiseFunction from './updateLabelImagePiecewiseFunction'

function applyLabelImageWeights(context, event) {
  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)
  const labelImageWeights = actorContext.labelImageWeights

  let piecewiseFunction = null
  if (!context.images.piecewiseFunctionProxies.has('labelImage')) {
    const piecewiseFunctionProxy = vtkPiecewiseFunctionProxy.newInstance()
    context.images.piecewiseFunctionProxies.set(
      'labelImage',
      piecewiseFunctionProxy
    )
    piecewiseFunction = piecewiseFunctionProxy.getPiecewiseFunction()

    const volume = context.images.representationProxy.getVolumes()[0]
    const volumeProperty = volume.getProperty()

    const numberOfComponents = actorContext.image
      ? actorContext.image.imageType.components
      : 0
    volumeProperty.setScalarOpacity(numberOfComponents, piecewiseFunction)

    // The slice shows the same piecewise function as the volume for label map
    const sliceActors = context.images.representationProxy.getActors()
    sliceActors.forEach(actor => {
      const actorProp = actor.getProperty()
      actorProp.setPiecewiseFunction(numberOfComponents, piecewiseFunction)
    })
  } else {
    piecewiseFunction = context.images.piecewiseFunctionProxies
      .get('labelImage')
      .getPiecewiseFunction()
  }

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
  context.service.send('RENDER')
}

export default applyLabelImageWeights

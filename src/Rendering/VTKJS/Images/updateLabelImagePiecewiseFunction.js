function transformUserWeight(userWeight, minWeight, maxWeight) {
  return userWeight * (maxWeight - minWeight) + minWeight
}

function updateLabelImagePiecewiseFunction(
  context,
  actorContext,
  selectedIndices = null
) {
  if (!!!actorContext.labelImage) {
    return
  }

  const piecewiseFunction = context.images.piecewiseFunctionProxies.get(
    'labelImage'
  )
  const labelImageWeights = actorContext.labelImageWeights

  let minLabelWeight = 0.0
  let maxLabelWeight = 1.0
  if (!actorContext.image) {
    maxLabelWeight = 0.05
    if (context.main.viewMode !== 'Volume') {
      maxLabelWeight = 1.0
      minLabelWeight = 0.4
    }
  }

  if (selectedIndices === null || selectedIndices === 'all') {
    const uniqueLabels = context.images.uniqueLabels
    // Update all values from the context
    const maxOpacity = 1.0
    const haveBackground = uniqueLabels[0] === 0 ? true : false

    piecewiseFunction.removeAllPoints()

    if (haveBackground) {
      piecewiseFunction.addPointLong(uniqueLabels[0], 0.0, 0.5, 1.0)
    } else {
      piecewiseFunction.addPointLong(
        uniqueLabels[0],
        transformUserWeight(
          labelImageWeights[0],
          minLabelWeight,
          maxLabelWeight
        ),
        0.5,
        1.0
      )
    }

    for (let i = 1; i < uniqueLabels.length; i++) {
      piecewiseFunction.addPointLong(
        uniqueLabels[i],
        transformUserWeight(
          labelImageWeights[i],
          minLabelWeight,
          maxLabelWeight
        ),
        0.5,
        1.0
      )
    }
  } else {
    // Otherwise, just update specific values
    selectedIndices.forEach(value => {
      const weight = transformUserWeight(
        labelImageWeights[value],
        minLabelWeight,
        maxLabelWeight
      )
      piecewiseFunction.setNodeValue(value, [value, weight, 0.5, 1.0])
    })
  }
}

export default updateLabelImagePiecewiseFunction

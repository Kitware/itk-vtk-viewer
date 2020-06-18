function transformUserWeight(userWeight, minWeight, maxWeight) {
  return userWeight * (maxWeight - minWeight) + minWeight
}

function updateLabelMapPiecewiseFunction(store, selectedIndices = null) {
  if (!store.imageUI.haveLabelMap) {
    return
  }

  const piecewiseFunction = store.imageUI.piecewiseFunction
  const uniqueLabels = store.imageUI.labelMapLabels
  const labelMapWeights = store.imageUI.labelMapWeights

  let minLabelWeight = 0.0
  let maxLabelWeight = 1.0
  if (store.imageUI.haveOnlyLabelMap) {
    maxLabelWeight = 0.05
    if (store.mainUI.viewMode !== 'VolumeRendering') {
      maxLabelWeight = 1.0
      minLabelWeight = 0.4
    }
  }

  if (selectedIndices === null || selectedIndices === 'all') {
    // Update all values from the store
    const maxOpacity = 1.0
    const haveBackground = uniqueLabels[0] === 0 ? true : false

    piecewiseFunction.removeAllPoints()

    if (haveBackground) {
      piecewiseFunction.addPointLong(uniqueLabels[0], 0.0, 0.5, 1.0)
    } else {
      piecewiseFunction.addPointLong(
        uniqueLabels[0],
        transformUserWeight(
          store.imageUI.labelMapWeights[0],
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
          store.imageUI.labelMapWeights[i],
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
        store.imageUI.labelMapWeights[value],
        minLabelWeight,
        maxLabelWeight
      )
      piecewiseFunction.setNodeValue(value, [value, weight, 0.5, 1.0])
    })
  }
}

export default updateLabelMapPiecewiseFunction

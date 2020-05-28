function updateLabelMapPiecewiseFunction(store, selectedIndices = null) {
  const piecewiseFunction = store.imageUI.piecewiseFunction
  const uniqueLabels = store.imageUI.labelMapLabels
  const labelMapWeights = store.imageUI.labelMapWeights

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
        labelMapWeights[0],
        0.5,
        1.0
      )
    }

    for (let i = 1; i < uniqueLabels.length; i++) {
      piecewiseFunction.addPointLong(
        uniqueLabels[i],
        labelMapWeights[i],
        0.5,
        1.0
      )
    }
  } else {
    // Otherwise, just update specific values
    selectedIndices.forEach(value => {
      const weight = store.imageUI.labelMapWeights[store.imageUI.selectedLabel]
      piecewiseFunction.setNodeValue(value, [value, weight, 0.5, 1.0])
    })
  }
}

export default updateLabelMapPiecewiseFunction

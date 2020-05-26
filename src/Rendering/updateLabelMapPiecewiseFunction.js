function updateLabelMapPiecewiseFunction(store, selectedIndex = null) {
  const piecewiseFunction = store.imageUI.piecewiseFunction
  const uniqueLabels = store.imageUI.labelMapLabels
  const labelMapWeights = store.imageUI.labelMapWeights

  if (selectedIndex === null || selectedIndex === 'all') {
    // Update all values from the store
    const maxOpacity = 1.0
    const haveBackground = uniqueLabels[0] === 0 ? true : false

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
    // Otherwise, just update one value
    const value = selectedIndex
    const weight = store.imageUI.labelMapWeights[store.imageUI.selectedLabel]
    piecewiseFunction.setNodeValue(value, [value, weight, 0.5, 1.0])
  }
}

export default updateLabelMapPiecewiseFunction

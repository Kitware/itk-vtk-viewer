function updateTransferFunctionHistogramValues(store, index) {
  const colorRange = store.imageUI.colorRanges[index]
  const numberOfComponents = store.imageUI.numberOfComponents
  const transferFunctionWidget = store.imageUI.transferFunctionWidget
  const dataArray = store.imageUI.image.getPointData().getScalars()
  transferFunctionWidget.setDataArray(dataArray.getData(), {
    numberOfComponents: numberOfComponents,
    component: index,
  })
  transferFunctionWidget.setGaussians(store.imageUI.opacityGaussians[index])

  const fullRange = dataArray.getRange(index)
  const diff = fullRange[1] - fullRange[0]
  const colorRangeNormalized = new Array(2)
  colorRangeNormalized[0] = (colorRange[0] - fullRange[0]) / diff
  colorRangeNormalized[1] = (colorRange[1] - fullRange[0]) / diff
  transferFunctionWidget.setRangeZoom(colorRangeNormalized)
}

export default updateTransferFunctionHistogramValues

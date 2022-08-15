// function updateTransferFunctionHistogramValues(store, index) {
//   if (!store.imageUI.image) {
//     return
//   }
//   const colorRange = store.imageUI.colorRanges[index]
//   const numberOfComponents = store.imageUI.totalIntensityComponents
//   const transferFunctionWidget = store.imageUI.transferFunctionWidget
//   const dataArray = store.imageUI.image.getPointData().getScalars()
//   transferFunctionWidget.setDataArray(dataArray.getData(), {
//     numberOfComponents: numberOfComponents,
//     component: index,
//   })
//   transferFunctionWidget.setGaussians(store.imageUI.opacityGaussians[index])

//   const fullRange = dataArray.getRange(index)
//   const diff = fullRange[1] - fullRange[0]
//   store.imageUI.windowMotionScale = diff
//   store.imageUI.levelMotionScale = diff
//   const {
//     rangeManipulator,
//     windowGet,
//     windowSet,
//     levelGet,
//     levelSet,
//   } = store.imageUI.transferFunctionManipulator
//   if (rangeManipulator !== null) {
//     rangeManipulator.setVerticalListener(
//       0,
//       store.imageUI.windowMotionScale,
//       diff / 100.0,
//       windowGet,
//       windowSet
//     )
//     rangeManipulator.setHorizontalListener(
//       fullRange[0],
//       fullRange[1],
//       diff / 100.0,
//       levelGet,
//       levelSet
//     )
//   }
//   const colorRangeNormalized = new Array(2)
//   colorRangeNormalized[0] = (colorRange[0] - fullRange[0]) / diff
//   colorRangeNormalized[1] = (colorRange[1] - fullRange[0]) / diff
//   transferFunctionWidget.setRangeZoom(colorRangeNormalized)
// }

// export default updateTransferFunctionHistogramValues

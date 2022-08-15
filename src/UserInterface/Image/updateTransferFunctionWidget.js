// import updateTransferFunctionHistogramValues from './updateTransferFunctionHistogramValues'
// import updateTransferFunctionLookupTable from './updateTransferFunctionLookupTable'

// function doUpdates(store, widget, component) {
//   updateTransferFunctionHistogramValues(store, component)
//   updateTransferFunctionLookupTable(store, component)
// }

// function updateTransferFunctionWidget(store) {
//   const totalComponents = store.imageUI.totalIntensityComponents
//   const transferFunctionWidget = store.imageUI.transferFunctionWidget
//   const selIdx = store.imageUI.selectedComponent
//   for (let component = 0; component < totalComponents; component++) {
//     if (component !== selIdx) {
//       doUpdates(store, transferFunctionWidget, component)
//     }
//   }
//   doUpdates(store, transferFunctionWidget, selIdx)
// }

// export default updateTransferFunctionWidget

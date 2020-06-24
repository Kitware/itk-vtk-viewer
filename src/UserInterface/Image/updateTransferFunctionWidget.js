import applyPiecewiseFunctionOpacities from '../../Rendering/applyPiecewiseFunctionOpacities'
import updateTransferFunctionHistogramValues from './updateTransferFunctionHistogramValues'
import updateTransferFunctionLookupTable from './updateTransferFunctionLookupTable'

function doUpdates(store, widget, component) {
  updateTransferFunctionHistogramValues(store, component)
  applyPiecewiseFunctionOpacities(store, component)
  updateTransferFunctionLookupTable(store, component)
}

function updateTransferFunctionWidget(store) {
  const numberOfComponents = store.imageUI.numberOfComponents
  const transferFunctionWidget = store.imageUI.transferFunctionWidget
  const selIdx = store.imageUI.selectedComponentIndex
  for (let component = 0; component < numberOfComponents; component++) {
    if (component !== selIdx) {
      doUpdates(store, transferFunctionWidget, component)
    }
  }
  doUpdates(store, transferFunctionWidget, selIdx)
}

export default updateTransferFunctionWidget

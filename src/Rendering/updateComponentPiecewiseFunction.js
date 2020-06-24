import applyPiecewiseFunctionOpacities from './applyPiecewiseFunctionOpacities'

function updateComponentPiecewiseFunction(store, component) {
  const lookupTableProxy = store.imageUI.lookupTableProxies[component]
  const lookupTable = lookupTableProxy.getLookupTable()
  const transferFunctionWidget = store.imageUI.transferFunctionWidget

  applyPiecewiseFunctionOpacities(store, component)

  const colorDataRange = transferFunctionWidget.getOpacityRange()
  lookupTable.setMappingRange(...colorDataRange)
  lookupTable.updateRange()

  const renderWindow = store.renderWindow
  if (!renderWindow.getInteractor().isAnimating()) {
    renderWindow.render()
  }
}

export default updateComponentPiecewiseFunction

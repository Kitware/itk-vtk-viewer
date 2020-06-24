function updateTransferFunctionLookupTable(store, index) {
  const proxy = store.imageUI.lookupTableProxies[index]
  if (!proxy) {
    return
  }
  const lookupTable = proxy.getLookupTable()
  const transferFunctionWidget = store.imageUI.transferFunctionWidget
  transferFunctionWidget.setColorTransferFunction(lookupTable)
  const colorDataRange = transferFunctionWidget.getOpacityRange()
  lookupTable.setMappingRange(...colorDataRange)
  lookupTable.updateRange()
}

export default updateTransferFunctionLookupTable

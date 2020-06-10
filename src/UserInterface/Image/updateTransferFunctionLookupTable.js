function updateTransferFunctionLookupTable(store, index) {
  const lookupTable = store.imageUI.lookupTableProxies[index].getLookupTable()
  const transferFunctionWidget = store.imageUI.transferFunctionWidget
  transferFunctionWidget.setColorTransferFunction(lookupTable)
  const colorDataRange = transferFunctionWidget.getOpacityRange()
  lookupTable.setMappingRange(...colorDataRange)
  lookupTable.updateRange()
}

export default updateTransferFunctionLookupTable

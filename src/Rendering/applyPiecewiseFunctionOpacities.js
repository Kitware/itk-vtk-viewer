import filterAndProcessOpacityNodes from './filterAndProcessOpacityNodes'

function applyPiecewiseFunctionOpacities(store, component) {
  const transferFunctionWidget = store.imageUI.transferFunctionWidget
  if (!transferFunctionWidget) {
    return
  }
  const opacityNodes = transferFunctionWidget.getOpacityNodes()
  const pwfProxies = store.imageUI.piecewiseFunctionProxies[component]
  const slicePiecewiseFunction = pwfProxies.slice.getPiecewiseFunction()
  const volumePiecewiseFunction = pwfProxies.volume.getPiecewiseFunction()

  transferFunctionWidget.applyOpacity(volumePiecewiseFunction)

  const numComps = store.imageUI.numberOfComponents
  const filteredNodes = filterAndProcessOpacityNodes(numComps, opacityNodes)
  slicePiecewiseFunction.setNodes(filteredNodes)
}

export default applyPiecewiseFunctionOpacities

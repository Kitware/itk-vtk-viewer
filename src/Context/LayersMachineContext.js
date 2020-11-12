class LayersMachineContext {
  // Map of layer dataset name to an object describing the layer. The object
  // has the members:
  //
  //  type: one of "image", "geometry", "pointset", or "widget"
  //  visible: boolean indicating whether the dataset is visible
  //  icon: img element icon for the layer or null
  layers = new Map()

  // The currently selected layers. User interface controls are presented for
  // the selected layers. Typically only one interface controls is displayed
  // per selected layers.
  selectedLayers = new Set()
}

export default LayersMachineContext

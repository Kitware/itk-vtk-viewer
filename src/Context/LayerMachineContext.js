class LayerMachineContext {
  // Map of layer dataset name to an object describing the layer. The object
  // has the members:
  //
  //  type: one of "image", "geometry", or "pointset"
  //  visible: boolean indicating whether the dataset is visible
  //  icon: img element icon for the layer or null
  layers = new Map()

  // The currently selected layer. User interface controls are presented for
  // the selected layer.
  selectedLayer = ''
}

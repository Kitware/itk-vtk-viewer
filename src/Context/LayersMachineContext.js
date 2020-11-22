class LayersMachineContext {
  // Actors for providing an interface to the layers
  layerUIActors = new Map()

  // Context for the layer actors
  actorContext = new Map()

  // A { name, data } object, queued for creation of the data's actor
  lastAddedData = null
}

export default LayersMachineContext

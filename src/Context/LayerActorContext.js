class LayerActorContext {
  //  One of "image", "labelImage", "geometry", "pointSet", or "widget"
  type = 'image'

  // Boolean indicating whether the dataset is visible
  visible = true

  // img element icon for the layer or null
  icon = null
}

export default LayerActorContext

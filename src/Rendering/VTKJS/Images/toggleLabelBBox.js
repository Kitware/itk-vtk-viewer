function toggleLabelBBox(context, event) {
  context.layers.labelBBoxEnabled = !context.layers.labelBBoxEnabled
  context.itkVtkView.setEnableBBox(context.layers.labelBBoxEnabled)
  context.service.send('RENDER')
}

export default toggleLabelBBox

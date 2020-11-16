import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

function applyLayersContrastSensitiveStyle(context) {
  context.layers.uiLayers.forEach(layerEntry => {
    applyContrastSensitiveStyleToElement(context, 'layerEntry', layerEntry)
    const visibleButton = layerEntry.children[0]
    const visibleLabel = visibleButton.children[1]
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      visibleLabel
    )
    const invisibleButton = layerEntry.children[1]
    const invisibleLabel = invisibleButton.children[1]
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      invisibleLabel
    )
    const layerLabel = layerEntry.children[2]
    applyContrastSensitiveStyleToElement(context, 'layerLabel', layerLabel)
    const iconElement = layerEntry.children[3]
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      iconElement
    )
  })
}

export default applyLayersContrastSensitiveStyle

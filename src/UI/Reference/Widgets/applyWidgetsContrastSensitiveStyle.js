import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

function applyMainContrastSensitiveStyle(context) {
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.widgets.distanceButtonLabel
  )
  applyContrastSensitiveStyleToElement(
    context,
    'distanceLabel',
    context.widgets.distanceLabel
  )
}

export default applyMainContrastSensitiveStyle

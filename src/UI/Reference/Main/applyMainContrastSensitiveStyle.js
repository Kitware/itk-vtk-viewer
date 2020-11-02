import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

function applyMainContrastSensitiveStyle(context, event) {
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.collapseUIButton
  )
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.screenshotButton
  )
  if (context.main.fullscreenButton) {
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.main.fullscreenButton
    )
  }
}

export default applyMainContrastSensitiveStyle

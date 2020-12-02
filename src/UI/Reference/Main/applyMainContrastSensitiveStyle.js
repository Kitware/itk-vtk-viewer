import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

function applyMainContrastSensitiveStyle(context) {
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
  if (context.main.rotateButtonLabel) {
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.main.rotateButtonLabel
    )
  }
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.annotationsButtonLabel
  )
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.axesButtonLabel
  )
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.interpolationButtonLabel
  )
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.bgColorButtonLabel
  )
  if (!context.use2D) {
    applyContrastSensitiveStyleToElement(
      context,
      'tooltipButton',
      context.main.xPlaneButtonLabel
    )
    applyContrastSensitiveStyleToElement(
      context,
      'tooltipButton',
      context.main.yPlaneButtonLabel
    )
    applyContrastSensitiveStyleToElement(
      context,
      'tooltipButton',
      context.main.zPlaneButtonLabel
    )
    applyContrastSensitiveStyleToElement(
      context,
      'tooltipButton',
      context.main.volumeButtonLabel
    )
  }
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.resetCameraButtonLabel
  )
}

export default applyMainContrastSensitiveStyle

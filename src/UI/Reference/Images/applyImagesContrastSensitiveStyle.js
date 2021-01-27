import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

function applyImagesContrastSensitiveStyle(context) {
  if (context.images.distanceButtonLabel) {
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.distanceButtonLabel
    )
    applyContrastSensitiveStyleToElement(
      context,
      'distanceLabel',
      context.images.distanceLabel
    )
  }
  if (context.images.shadowButtonLabel) {
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.shadowButtonLabel
    )
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.sliderEntryDiv
    )
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.volumeSampleDistanceDiv
    )
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.blendModeDiv
    )
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.labelImageBlendDiv
    )
  }
}

export default applyImagesContrastSensitiveStyle

import createImagesInterface from './createImagesInterface'
import updateImageInterface from './updateImageInterface'
import updateLabelImageInterface from './updateLabelImageInterface'
import updateRenderedImageInterface from './updateRenderedImageInterface'
import selectImageComponent from './selectImageComponent'
import toggleInterpolation from './toggleInterpolation'
import applyComponentVisibility from './applyComponentVisibility'
import applyColorRange from './applyColorRange'
import applyColorRangeBounds from './applyColorRangeBounds'
import applyColorMap from './applyColorMap'
import applyPiecewiseFunctionGaussians from './applyPiecewiseFunctionGaussians'
import toggleShadow from './toggleShadow'
import applyGradientOpacity from './applyGradientOpacity'
import applyGradientOpacityScale from './applyGradientOpacityScale'
import applyVolumeSampleDistance from './applyVolumeSampleDistance'
import applyBlendMode from './applyBlendMode'
import applyHistogram from './applyHistogram'
import applyLookupTable from './applyLookupTable'
import applyLabelImageBlend from './applyLabelImageBlend'
import applyLabelImageWeights from './applyLabelImageWeights'
import applyLabelNames from './applyLabelNames'
import applySelectedLabel from './applySelectedLabel'
import scaleSelector from './scaleSelector'
import { applyPiecewiseFunctionPointsToEditor } from './createTransferFunctionWidget'
import { applyCinematicChanged } from './cinematic'
import toggleWindowLevel from './toggleWindowLevel'
import applyWindowLevelReset from './applyWindowingReset'

const imagesUIMachineOptions = {
  actions: {
    createImagesInterface,
    updateImageInterface,
    updateLabelImageInterface,
    updateRenderedImageInterface,

    selectImageComponent,

    toggleInterpolation,

    applyComponentVisibility,
    applyColorRange,
    applyColorRangeBounds,
    applyColorMap,
    applyPiecewiseFunctionGaussians,
    applyPiecewiseFunctionPointsToEditor,
    toggleWindowLevel,
    applyWindowLevelReset,

    toggleShadow,
    applyGradientOpacity,
    applyGradientOpacityScale,
    applyVolumeSampleDistance,
    applyBlendMode,
    applyCinematicChanged,

    applyHistogram,

    applyLookupTable,
    applyLabelImageBlend,
    applyLabelImageWeights,
    applyLabelNames,
    applySelectedLabel,
  },
  services: {
    scaleSelector,
  },
}

export default imagesUIMachineOptions

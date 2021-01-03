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
import applyLookupTable from './applyLookupTable'
import applyLabelImageBlend from './applyLabelImageBlend'

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

    toggleShadow,
    applyGradientOpacity,
    applyGradientOpacityScale,
    applyVolumeSampleDistance,
    applyBlendMode,

    applyLookupTable,
    applyLabelImageBlend,
  },
}

export default imagesUIMachineOptions

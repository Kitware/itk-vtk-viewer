import createImagesInterface from './createImagesInterface'
import updateImageInterface from './updateImageInterface'
import updateRenderedImageInterface from './updateRenderedImageInterface'
import selectImageComponent from './selectImageComponent'
import applyComponentVisibility from './applyComponentVisibility'
import applyColorRange from './applyColorRange'
import applyColorRangeBounds from './applyColorRangeBounds'
import applyColorMap from './applyColorMap'
import applyPiecewiseFunctionGaussians from './applyPiecewiseFunctionGaussians'
import toggleShadow from './toggleShadow'
import applyGradientOpacity from './applyGradientOpacity'
import applyGradientOpacityScale from './applyGradientOpacityScale'

const imagesUIMachineOptions = {
  actions: {
    createImagesInterface,
    updateImageInterface,
    updateRenderedImageInterface,

    selectImageComponent,

    applyComponentVisibility,
    applyColorRange,
    applyColorRangeBounds,
    applyColorMap,
    applyPiecewiseFunctionGaussians,

    toggleShadow,
    applyGradientOpacity,
    applyGradientOpacityScale,
  },
}

export default imagesUIMachineOptions

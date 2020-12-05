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
  },
}

export default imagesUIMachineOptions

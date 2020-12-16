import createImageRenderer from './createImageRenderer'
import applyVisibility from './applyVisibility'
import applyComponentVisibility from './applyComponentVisibility'
import updateRenderedImage from './updateRenderedImage'
import selectImageLayer from './selectImageLayer'
import toggleInterpolation from './toggleInterpolation'
import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'
import applyRenderedImage from './applyRenderedImage'
import applyPiecewiseFunction from './applyPiecewiseFunction'
import applyShadow from './applyShadow'
import applyGradientOpacity from './applyGradientOpacity'
import applyVolumeSampleDistance from './applyVolumeSampleDistance'
import applyBlendMode from './applyBlendMode'

const imagesRenderingMachineOptions = {
  imageRenderingActor: {
    services: {
      createImageRenderer,
      updateRenderedImage,
    },

    actions: {
      applyRenderedImage,

      applyVisibility,

      toggleInterpolation,

      applyComponentVisibility,

      applyPiecewiseFunction,

      applyColorRange,

      applyColorMap,

      applyShadow,

      applyGradientOpacity,

      applyVolumeSampleDistance,

      applyBlendMode,
    },
  },

  actions: {
    selectImageLayer,
  },
}

export default imagesRenderingMachineOptions

import createImageRenderer from './createImageRenderer'
import applyImageColors from './applyImageColors'
import applyVisibility from './applyVisibility'
import applyComponentVisibility from './applyComponentVisibility'
import updateRenderedImage from './updateRenderedImage'
import selectImageLayer from './selectImageLayer'
import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'
import applyRenderedImage from './applyRenderedImage'
import applyPiecewiseFunction from './applyPiecewiseFunction'
import applyShadow from './applyShadow'
import applyGradientOpacity from './applyGradientOpacity'

const imagesRenderingMachineOptions = {
  imageRenderingActor: {
    services: {
      createImageRenderer,
      updateRenderedImage,
    },

    actions: {
      applyRenderedImage,

      applyImageColors,

      applyVisibility,

      applyComponentVisibility,

      applyPiecewiseFunction,

      applyColorRange,

      applyColorMap,

      applyShadow,

      applyGradientOpacity,
    },
  },

  actions: {
    selectImageLayer,
  },
}

export default imagesRenderingMachineOptions

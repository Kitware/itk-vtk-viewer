import createImageRenderer from './createImageRenderer'
import applyImageColors from './applyImageColors'
import applyGradientOpacity from './applyGradientOpacity'
import applyVisibility from './applyVisibility'
import applyComponentVisibility from './applyComponentVisibility'
import updateRenderedImage from './updateRenderedImage'
import selectImageLayer from './selectImageLayer'
import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'
import applyRenderedImage from './applyRenderedImage'

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

      applyColorRange,

      applyColorMap,
    },
  },

  actions: {
    selectImageLayer,
  },
}

export default imagesRenderingMachineOptions

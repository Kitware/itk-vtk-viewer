import createImageRenderer from './createImageRenderer'
import applyImageColors from './applyImageColors'
import applyGradientOpacity from './applyGradientOpacity'
import applyVisibility from './applyVisibility'
import applyComponentVisibility from './applyComponentVisibility'
import updateData from './updateData'

const imagesRenderingMachineOptions = {
  imageRenderingActor: {
    services: {
      createImageRenderer,

      updateData,
    },

    actions: {
      applyImageColors,

      applyVisibility,

      applyComponentVisibility,
    },
  },

  actions: {},
}

export default imagesRenderingMachineOptions

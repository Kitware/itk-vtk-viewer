import createImageRenderer from './createImageRenderer'
import applyComponentWeight from './applyComponentWeight'
import applyImageColors from './applyImageColors'
import applyGradientOpacity from './applyGradientOpacity'
import applyVisibility from './applyVisibility'

const imagesRenderingMachineOptions = {
  imageRenderingActor: {
    services: {
      createImageRenderer,
    },

    actions: {
      applyComponentWeight,

      applyImageColors,

      applyVisibility,
    },
  },

  actions: {},
}

export default imagesRenderingMachineOptions

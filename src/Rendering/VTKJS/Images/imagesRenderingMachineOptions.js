import createImageRenderer from './createImageRenderer'
import applyComponentWeight from './applyComponentWeight'
import applyImageColors from './applyImageColors'
import applyGradientOpacity from './applyGradientOpacity'

const imagesRenderingMachineOptions = {
  imageRenderingActor: {
    services: {
      createImageRenderer,
    },

    actions: {
      applyComponentWeight,

      applyImageColors,
    },
  },

  actions: {},
}

export default imagesRenderingMachineOptions

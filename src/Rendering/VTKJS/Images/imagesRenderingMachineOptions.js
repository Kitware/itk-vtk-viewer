import createImageRenderer from './createImageRenderer'
import createImagesRenderer from './createImagesRenderer'

const imagesRenderingMachineOptions = {
  imageRenderingActor: {
    services: {
      createImageRenderer,
    },
  },

  actions: {
    createImagesRenderer,
  },
}

export default imagesRenderingMachineOptions

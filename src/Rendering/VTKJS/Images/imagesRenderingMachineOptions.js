import createImageRenderer from './createImageRenderer'
import applyImageColors from './applyImageColors'
import applyGradientOpacity from './applyGradientOpacity'
import applyVisibility from './applyVisibility'
import applyComponentVisibility from './applyComponentVisibility'
import updateData from './updateData'
import selectImageLayer from './selectImageLayer'
import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'

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

      applyColorRange,

      applyColorMap,
    },
  },

  actions: {
    selectImageLayer,
  },
}

export default imagesRenderingMachineOptions

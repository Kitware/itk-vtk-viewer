import createLayersInterface from './createLayersInterface'
import createLayerInterface from './createLayerInterface'
import toggleLayerVisibility from './toggleLayerVisibility'

const layersUIMachineOptions = {
  layerUIActor: {
    actions: {
      createLayerInterface,

      toggleLayerVisibility,
    },
  },

  actions: {
    createLayersInterface,
  },
}

export default layersUIMachineOptions

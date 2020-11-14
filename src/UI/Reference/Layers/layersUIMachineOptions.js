import createLayersInterface from './createLayersInterface'
import createLayerInterface from './createLayerInterface'

const layersUIMachineOptions = {
  layerUIActor: {
    actions: {
      createLayerInterface,
    },
  },

  actions: {
    createLayersInterface,
  },
}

export default layersUIMachineOptions

import createLayersInterface from './createLayersInterface'
import createLayerInterface from './createLayerInterface'
import toggleLayerVisibility from './toggleLayerVisibility'
import selectLayer from './selectLayer'

const layersUIMachineOptions = {
  layerUIActor: {
    actions: {
      createLayerInterface,

      selectLayer,

      toggleLayerVisibility,
    },
  },

  actions: {
    createLayersInterface,
  },
}

export default layersUIMachineOptions

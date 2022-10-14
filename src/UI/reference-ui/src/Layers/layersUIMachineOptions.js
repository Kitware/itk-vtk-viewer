import createLayersInterface from './createLayersInterface'
import createLayerInterface from './createLayerInterface'
import toggleLayerVisibility from './toggleLayerVisibility'
import selectLayer from './selectLayer'
import { idle, imageUpdating } from './imageUpdateIndicator'

const layersUIMachineOptions = {
  layerUIActor: {
    actions: {
      createLayerInterface,
      selectLayer,
      toggleLayerVisibility,
      imageUpdating,
      idle,
    },
  },

  actions: {
    createLayersInterface,
  },
}

export default layersUIMachineOptions

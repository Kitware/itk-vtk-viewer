import createLayersInterface from './createLayersInterface'
import createLayerInterface from './createLayerInterface'
import toggleLayerVisibility from './toggleLayerVisibility'
import selectLayer from './selectLayer'
import { startDataUpdate, finishDataUpdate } from './dataUpdateIndicator'

const layersUIMachineOptions = {
  layerUIActor: {
    actions: {
      createLayerInterface,
      selectLayer,
      toggleLayerVisibility,
      startDataUpdate,
      finishDataUpdate,
    },
  },

  actions: {
    createLayersInterface,
  },
}

export default layersUIMachineOptions

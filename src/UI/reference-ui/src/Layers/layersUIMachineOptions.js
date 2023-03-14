import createLayersInterface from './createLayersInterface'
import createLayerInterface from './createLayerInterface'
import toggleLayerVisibility from './toggleLayerVisibility'
import selectLayer from './selectLayer'
import { startDataUpdate, finishDataUpdate } from './dataUpdateIndicator'
import { compareUI } from './compareUI'

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

  services: {
    compareUI,
  },
}

export default layersUIMachineOptions

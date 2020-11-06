import mainUIMachineOptions from './Main/mainUIMachineOptions'
import layersUIMachineOptions from './Layers/layersUIMachineOptions'
import imagesUIMachineOptions from './Images/imagesUIMachineOptions'

import applyContrastSensitiveStyle from './applyContrastSensitiveStyle'
import createInterface from './createInterface'
import toggleUICollapsed from './toggleUICollapsed'

const referenceUIMachineOptions = {
  main: mainUIMachineOptions,

  layers: layersUIMachineOptions,

  images: imagesUIMachineOptions,

  actions: {
    applyContrastSensitiveStyle,

    createInterface,

    toggleUICollapsed,
  },
}

export default referenceUIMachineOptions

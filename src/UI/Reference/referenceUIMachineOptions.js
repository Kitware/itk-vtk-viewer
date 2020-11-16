import mainUIMachineOptions from './Main/mainUIMachineOptions'
import layersUIMachineOptions from './Layers/layersUIMachineOptions'
import imagesUIMachineOptions from './Images/imagesUIMachineOptions'

import toggleDarkMode from './toggleDarkMode'
import createInterface from './createInterface'
import toggleUICollapsed from './toggleUICollapsed'

const referenceUIMachineOptions = {
  main: mainUIMachineOptions,

  layers: layersUIMachineOptions,

  images: imagesUIMachineOptions,

  actions: {
    toggleDarkMode,

    createInterface,

    toggleUICollapsed,
  },
}

export default referenceUIMachineOptions

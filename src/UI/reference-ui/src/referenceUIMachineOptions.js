import mainUIMachineOptions from './Main/mainUIMachineOptions'
import layersUIMachineOptions from './Layers/layersUIMachineOptions'
import imagesUIMachineOptions from './Images/imagesUIMachineOptions'
import widgetsUIMachineOptions from './Widgets/widgetsUIMachineOptions'

import toggleDarkMode from './toggleDarkMode'
import createInterface from './createInterface'
import toggleUICollapsed from './toggleUICollapsed'

const referenceUIMachineOptions = {
  main: mainUIMachineOptions,

  layers: layersUIMachineOptions,

  images: imagesUIMachineOptions,

  widgets: widgetsUIMachineOptions,

  actions: {
    toggleDarkMode,

    createInterface,

    toggleUICollapsed,
  },
}

export default referenceUIMachineOptions

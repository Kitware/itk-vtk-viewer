import mainUIMachineOptions from './Main/mainUIMachineOptions'

import applyContrastSensitiveStyle from './applyContrastSensitiveStyle'
import createInterface from './createInterface'
import toggleUICollapsed from './toggleUICollapsed'

const referenceUIMachineOptions = {
  main: mainUIMachineOptions,

  actions: {
    applyContrastSensitiveStyle,

    createInterface,

    toggleUICollapsed,
  },
}

export default referenceUIMachineOptions

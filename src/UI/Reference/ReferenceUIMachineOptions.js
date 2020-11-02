import MainMachineOptions from './Main/MainMachineOptions'

import createInterface from './createInterface'
import toggleFullscreen from './toggleFullscreen'
import toggleUICollapsed from './toggleUICollapsed'
import applyContrastSensitiveStyle from './applyContrastSensitiveStyle'

const ReferenceUIMachineOptions = {
  main: MainMachineOptions,

  actions: {
    applyContrastSensitiveStyle,

    createInterface,

    toggleFullscreen,

    toggleUICollapsed,
  },
}

export default ReferenceUIMachineOptions

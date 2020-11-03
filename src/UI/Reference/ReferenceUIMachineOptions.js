import MainMachineOptions from './Main/MainMachineOptions'

import applyContrastSensitiveStyle from './applyContrastSensitiveStyle'
import createInterface from './createInterface'
import toggleUICollapsed from './toggleUICollapsed'

const ReferenceUIMachineOptions = {
  main: MainMachineOptions,

  actions: {
    applyContrastSensitiveStyle,

    createInterface,

    toggleUICollapsed,
  },
}

export default ReferenceUIMachineOptions

import MainMachineOptions from './Main/MainMachineOptions'

import createInterface from './createInterface'
import toggleUICollapsed from './toggleUICollapsed'

const ReferenceUIMachineOptions = {
  main: MainMachineOptions,

  actions: {
    createInterface,

    toggleUICollapsed,
  },
}

export default ReferenceUIMachineOptions

import createRenderer from './createRenderer'

import MainMachineOptions from './Main/MainMachineOptions'

const VTKJSRenderingMachineOptions = {
  actions: {
    createRenderer,
  },

  main: MainMachineOptions,
}

export default VTKJSRenderingMachineOptions

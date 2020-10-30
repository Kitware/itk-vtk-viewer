import createRenderer from './createRenderer'
import render from './render'

import MainMachineOptions from './Main/MainMachineOptions'

const VTKJSRenderingMachineOptions = {
  actions: {
    createRenderer,

    render,
  },

  main: MainMachineOptions,
}

export default VTKJSRenderingMachineOptions

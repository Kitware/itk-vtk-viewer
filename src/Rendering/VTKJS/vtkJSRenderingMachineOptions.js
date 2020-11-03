import createRenderer from './createRenderer'
import render from './render'

import mainRenderingMachineOptions from './Main/mainRenderingMachineOptions'

const vtkJSRenderingMachineOptions = {
  actions: {
    createRenderer,

    render,
  },

  main: mainRenderingMachineOptions,
}

export default vtkJSRenderingMachineOptions

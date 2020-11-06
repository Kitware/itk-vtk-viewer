import createRenderer from './createRenderer'
import render from './render'

import mainRenderingMachineOptions from './Main/mainRenderingMachineOptions'
import layersRenderingMachineOptions from './Layers/layersRenderingMachineOptions'

const vtkJSRenderingMachineOptions = {
  actions: {
    createRenderer,

    render,
  },

  main: mainRenderingMachineOptions,
  layers: layersRenderingMachineOptions,
}

export default vtkJSRenderingMachineOptions

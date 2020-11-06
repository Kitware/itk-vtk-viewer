import createRenderer from './createRenderer'
import render from './render'

import mainRenderingMachineOptions from './Main/mainRenderingMachineOptions'
import layersRenderingMachineOptions from './Layers/layersRenderingMachineOptions'
import imagesRenderingMachineOptions from './Images/imagesRenderingMachineOptions'

const vtkJSRenderingMachineOptions = {
  main: mainRenderingMachineOptions,

  layers: layersRenderingMachineOptions,

  images: imagesRenderingMachineOptions,

  actions: {
    createRenderer,

    render,
  },
}

export default vtkJSRenderingMachineOptions

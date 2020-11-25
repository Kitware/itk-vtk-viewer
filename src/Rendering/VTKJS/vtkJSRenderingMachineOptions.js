import createRenderer from './createRenderer'
import render from './render'
import requestAnimation from './requestAnimation'
import cancelAnimation from './cancelAnimation'

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
    requestAnimation,
    cancelAnimation,
  },
}

export default vtkJSRenderingMachineOptions

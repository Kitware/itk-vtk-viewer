import createRenderingViewContainers from './UI/createRenderingViewContainers'
import styleRenderingViewContainers from './UI/styleRenderingViewContainers'

import referenceUIMachineOptions from './UI/reference-ui/dist/referenceUIMachineOptions'
import vtkJSRenderingMachineOptions from './Rendering/VTKJS/vtkJSRenderingMachineOptions'

const ViewerMachineOptions = {
  actions: {
    createRenderingViewContainers,
    styleRenderingViewContainers,
  },

  ui: referenceUIMachineOptions,

  rendering: vtkJSRenderingMachineOptions,
}

export default ViewerMachineOptions

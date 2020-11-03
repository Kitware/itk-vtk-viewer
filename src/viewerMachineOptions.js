import styleContainer from './UI/styleContainer'
import createContainer from './UI/createContainer'

import referenceUIMachineOptions from './UI/Reference/referenceUIMachineOptions'
import vtkJSRenderingMachineOptions from './Rendering/VTKJS/vtkJSRenderingMachineOptions'

const ViewerMachineOptions = {
  actions: {
    createContainer,
    styleContainer,
  },

  ui: referenceUIMachineOptions,

  rendering: vtkJSRenderingMachineOptions,
}

export default ViewerMachineOptions

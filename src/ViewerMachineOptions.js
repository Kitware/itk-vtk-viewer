import styleContainer from './UI/styleContainer'
import createContainer from './UI/createContainer'

import ReferenceUIMachineOptions from './UI/Reference/ReferenceUIMachineOptions'
import VTKJSRenderingMachineOptions from './Rendering/VTKJS/VTKJSRenderingMachineOptions'

const ViewerMachineOptions = {
  actions: {
    createContainer,
    styleContainer,
  },

  ui: ReferenceUIMachineOptions,

  rendering: VTKJSRenderingMachineOptions,
}

export default ViewerMachineOptions

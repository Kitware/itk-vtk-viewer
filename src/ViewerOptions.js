import applyContainerStyle from './UI/applyContainerStyle'
import createContainer from './UI/createContainer'

import vtkJSRenderingMachineOptions from './Rendering/VTKJS/MachineOptions'

class ViewerOptions {
  actions = {
    createContainer,
    applyContainerStyle,
  }

  uiOptions = {}
  renderingOptions = vtkJSRenderingMachineOptions
}

export default ViewerOptions

import createRenderingViewContainers from './UI/createRenderingViewContainers'
import styleRenderingViewContainers from './UI/styleRenderingViewContainers'

import referenceUIMachineOptions from './UI/reference-ui/dist/referenceUIMachineOptions'
import vtkJSRenderingMachineOptions from './Rendering/VTKJS/vtkJSRenderingMachineOptions'

const ViewerMachineOptions = {
  actions: {
    createRenderingViewContainers,
    styleRenderingViewContainers,
    downloadImage: (context, event) => {
      const { croppingPlanes } = context.main
      context.service.send({
        type: 'SAVE_ROI',
        data: {
          name: event.data.name,
          layerName: event.data.layerName,
          croppingPlanes,
        },
      })
    },
  },

  ui: referenceUIMachineOptions,

  rendering: vtkJSRenderingMachineOptions,
}

export default ViewerMachineOptions

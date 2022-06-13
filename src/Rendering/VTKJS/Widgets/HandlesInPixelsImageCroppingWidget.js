import macro from 'vtk.js/Sources/macros'
import vtkImageCroppingWidget from 'vtk.js/Sources/Widgets/Widgets3D/ImageCroppingWidget'
import vtkSphereHandleRepresentation from 'vtk.js/Sources/Widgets/Representations/SphereHandleRepresentation'
import vtkCroppingOutlineRepresentation from 'vtk.js/Sources/Widgets/Representations/CroppingOutlineRepresentation'

import { ViewTypes } from 'vtk.js/Sources/Widgets/Core/WidgetManager/Constants'

// ----------------------------------------------------------------------------
// Factory
// ----------------------------------------------------------------------------

function HandlesInPixelsImageCroppingWidget(publicAPI, model) {
  model.classHierarchy.push('HandlesInPixelsImageCroppingWidget')

  publicAPI.getRepresentationsForViewType = viewType => {
    switch (viewType) {
      case ViewTypes.DEFAULT:
      case ViewTypes.GEOMETRY:
      case ViewTypes.SLICE:
      case ViewTypes.VOLUME:
      default:
        return [
          // Describes constructing a vtkSphereHandleRepresentation, and every
          // time the widget state updates, we will give the representation
          // a list of all handle states (which have the label "handles").
          {
            builder: vtkSphereHandleRepresentation,
            labels: ['handles'],
            initialValues: {
              scaleInPixels: true,
            },
          },
          {
            builder: vtkCroppingOutlineRepresentation,
            // outline is defined by corner points
            labels: ['corners'],
          },
        ]
    }
  }
}

// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {}

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues)

  vtkImageCroppingWidget.extend(publicAPI, model, initialValues)

  HandlesInPixelsImageCroppingWidget(publicAPI, model)
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(
  extend,
  'HandlesInPixelsImageCroppingWidget'
)

// ----------------------------------------------------------------------------

export default { newInstance, extend }

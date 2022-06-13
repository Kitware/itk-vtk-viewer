import macro from 'vtk.js/Sources/macros'
import vtkSphereHandleRepresentation from 'vtk.js/Sources/Widgets/Representations/SphereHandleRepresentation'
import vtkDistanceWidget from 'vtk.js/Sources/Widgets/Widgets3D/DistanceWidget'
import vtkDistanceWidgetBehavoir from 'vtk.js/Sources/Widgets/Widgets3D/DistanceWidget/behavior'
import vtkPolyLineRepresentation from 'vtk.js/Sources/Widgets/Representations/PolyLineRepresentation'

import stateGenerator from './state'

import { ViewTypes } from 'vtk.js/Sources/Widgets/Core/WidgetManager/Constants'

// ----------------------------------------------------------------------------
// Factory
// ----------------------------------------------------------------------------

function DistanceWidget(publicAPI, model) {
  model.classHierarchy.push('DistanceWidget')

  // --- Widget Requirement ---------------------------------------------------

  model.methodsToLink = [
    ...(model.methodsToLink ?? []),
    'circleProps',
    'lineProps',
    'textProps',
    'text',
    'textStateIndex',
  ]
  model.behavior = vtkDistanceWidgetBehavoir
  model.widgetState = stateGenerator()
  publicAPI.getRepresentationsForViewType = viewType => {
    switch (viewType) {
      case ViewTypes.DEFAULT:
      case ViewTypes.GEOMETRY:
      case ViewTypes.SLICE:
      case ViewTypes.VOLUME:
      default:
        return [
          {
            builder: vtkSphereHandleRepresentation,
            labels: ['handles'],
            initialValues: {
              scaleInPixels: true,
            },
          },
          {
            builder: vtkSphereHandleRepresentation,
            labels: ['moveHandle'],
            initialValues: {
              scaleInPixels: true,
            },
          },
          {
            builder: vtkPolyLineRepresentation,
            labels: ['handles', 'moveHandle'],
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

  vtkDistanceWidget.extend(publicAPI, model, {
    ...initialValues,
    useCameraFocalPoint: true,
  })

  DistanceWidget(publicAPI, model)
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'DistanceWidget')

// ----------------------------------------------------------------------------

export default { newInstance, extend }

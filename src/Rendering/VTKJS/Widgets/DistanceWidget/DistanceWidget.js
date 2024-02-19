import macro from 'vtk.js/Sources/macros'
import vtkLineWidget from 'vtk.js/Sources/Widgets/Widgets3D/LineWidget'
import vtkLineWidgetBehavior from 'vtk.js/Sources/Widgets/Widgets3D/LineWidget/behavior'
import stateGenerator from 'vtk.js/Sources/Widgets/Widgets3D/LineWidget/state'

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
  model.behavior = vtkLineWidgetBehavior
  model.widgetState = stateGenerator()
}

// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {}

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues)

  vtkLineWidget.extend(publicAPI, model, {
    ...initialValues,
    useCameraFocalPoint: true,
  })

  DistanceWidget(publicAPI, model)
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'DistanceWidget')

// ----------------------------------------------------------------------------

export default { newInstance, extend }

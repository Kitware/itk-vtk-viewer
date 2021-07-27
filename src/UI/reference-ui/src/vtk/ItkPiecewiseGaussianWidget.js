import macro from '@kitware/vtk.js/macro'
import vtkPiecewiseGaussianWidget from '@kitware/vtk.js/Interaction/Widgets/PiecewiseGaussianWidget'

/* eslint-disable no-continue */

// ----------------------------------------------------------------------------
// vtkPiecewiseGaussianWidget methods
// ----------------------------------------------------------------------------

function vtkItkPiecewiseGaussianWidget(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkItkPiecewiseGaussianWidget')
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {}

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues)

  // Inheritance
  vtkPiecewiseGaussianWidget.extend(publicAPI, model, initialValues)
  macro.setGet(publicAPI, model, ['histogram'])
  macro.setGetArray(publicAPI, model, ['dataRange'], 2)

  // Object specific methods
  vtkItkPiecewiseGaussianWidget(publicAPI, model)
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(
  extend,
  'vtkItkPiecewiseGaussianWidget'
)

// ----------------------------------------------------------------------------

export default { newInstance, extend }

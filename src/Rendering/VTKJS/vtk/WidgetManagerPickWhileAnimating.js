import Macro from 'vtk.js/Sources/macros'
import vtkWidgetManager from 'vtk.js/Sources/Widgets/Core/WidgetManager'

// Let widgets handleEvents while interactor is animating
function WidgetManagerPickWhileAnimating(publicAPI, model) {
  model.classHierarchy.push('WidgetManagerPickWhileAnimating')

  const subscriptions = []

  const superSetRenderer = publicAPI.setRenderer
  publicAPI.setRenderer = renderer => {
    superSetRenderer(renderer)

    subscriptions.push(
      model._interactor.onStartAnimation(() => {
        model.isAnimating = false // undoes super class setting this to true
      })
    )
  }

  const superDelete = publicAPI.delete
  publicAPI.delete = () => {
    while (subscriptions.length) {
      subscriptions.pop().unsubscribe()
    }
    superDelete()
  }
}

const DEFAULT_VALUES = {}

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues)

  vtkWidgetManager.extend(publicAPI, model, initialValues)

  WidgetManagerPickWhileAnimating(publicAPI, model)
}

// ----------------------------------------------------------------------------

export const newInstance = Macro.newInstance(
  extend,
  'WidgetManagerPickWhileAnimating'
)

// ----------------------------------------------------------------------------

export default { newInstance, extend }

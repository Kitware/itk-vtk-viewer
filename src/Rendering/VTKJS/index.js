import { interpret } from 'xstate'
import { Machine } from 'xstate'

import renderingConfiguration from '../Configuration/index'

const renderingMachine = Machine(renderingConfiguration)

const vtkJSRendering = interpret(renderingMachine)
  .onTransition((state) => console.log(state.value))
  .start()

console.log(vtkJSRendering)

export default vtkJSRendering

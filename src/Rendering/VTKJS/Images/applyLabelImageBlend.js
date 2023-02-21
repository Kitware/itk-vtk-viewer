import { applyComponentWeights } from './applyComponentWeights'

function applyLabelImageBlend(context, event) {
  applyComponentWeights(context, event.data.name)
}

export default applyLabelImageBlend

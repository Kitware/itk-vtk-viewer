import applyLookupTable from './applyLookupTable'
import applyLabelImageBlend from './applyLabelImageBlend'
function updateLabelImageInterface(context) {
  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  const labelImage = actorContext.labelImage

  if (labelImage) {
    applyLookupTable(context, {
      data: { name, lookupTable: actorContext.lookupTable },
    })
    applyLabelImageBlend(context, {
      data: { name, labelImageBlend: actorContext.labelImageBlend },
    })
  }
}

export default updateLabelImageInterface

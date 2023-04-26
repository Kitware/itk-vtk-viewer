import { computeHistogram } from '../../../IO/Analyze/computeHistograms'

function makeHistogram(actorContext, component) {
  const dataArray = actorContext.fusedImage.getPointData().getScalars()
  if (!dataArray) return undefined
  const numberOfComponents = dataArray.getNumberOfComponents()

  const fusedImageComponent = actorContext.visualizedComponents.indexOf(
    component
  )

  if (fusedImageComponent === -1) return undefined

  const [min, max] = actorContext.colorRangeBounds.get(component) ?? [0, 0] // [0, 0] default for no image, only imageLabel case
  return computeHistogram(
    dataArray.getData(),
    fusedImageComponent,
    numberOfComponents,
    [min, max]
  )
}

async function updateHistogram(context) {
  const actorContext = context.images.actorContext.get(context.actorName)
  const component = actorContext.selectedComponent

  const histogram =
    actorContext.histograms.get(component) ?? // histogram may have been cleared after loading new data
    (await makeHistogram(actorContext, component))

  if (histogram) actorContext.histograms.set(component, histogram) // component or image may not be loaded

  context.service.send({
    type: 'IMAGE_HISTOGRAM_UPDATED',
    data: { name: context.actorName, component, histogram },
  })
}

export default updateHistogram

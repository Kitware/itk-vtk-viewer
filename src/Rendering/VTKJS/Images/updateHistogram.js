import { computeHistogram } from '../../../IO/Analyze/computeHistograms'

async function updateHistogram(
  context,
  {
    data: { name, component } = {
      name: context.images.selectedName,
      component: context.images.actorContext.get(context.images.selectedName)
        .selectedComponent,
    },
  }
) {
  const actorContext = context.images.actorContext.get(name)

  const histogram =
    actorContext.histograms.get(component) ?? // histogram may have been cleared after loading new data
    (await computeHistogram(actorContext, component))

  actorContext.histograms.set(component, histogram)

  context.service.send({
    type: 'IMAGE_HISTOGRAM_UPDATED',
    data: { name, component, histogram },
  })
}

export default updateHistogram

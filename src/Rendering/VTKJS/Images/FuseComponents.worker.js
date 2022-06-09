import registerWebworker from 'webworker-promise/lib/register'
import { computeRanges, fuseComponents } from './fuseImagesUtils'

registerWebworker(async ({ componentInfo, existingArray }) => {
  const imageArray = fuseComponents({ componentInfo, existingArray })
  const componentRanges = await computeRanges(imageArray, componentInfo.length)
  return new registerWebworker.TransferableResponse(
    [imageArray, componentRanges],
    [imageArray.buffer]
  )
})

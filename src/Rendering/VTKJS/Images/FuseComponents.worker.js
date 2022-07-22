import registerWebworker from 'webworker-promise/lib/register'
import { computeRanges, fuseComponents } from './fuseImagesUtils'

registerWebworker(async ({ componentInfo, arrayToFill }) => {
  const imageArray = fuseComponents({
    componentInfo,
    arrayToFill,
  })
  const componentRanges = await computeRanges(imageArray, componentInfo.length)
  return new registerWebworker.TransferableResponse(
    [imageArray, componentRanges],
    [imageArray.buffer]
  )
})

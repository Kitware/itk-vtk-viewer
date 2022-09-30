import registerWebworker from 'webworker-promise/lib/register'
import { computeRanges, fuseComponents } from './fuseImagesUtils'

registerWebworker(async ({ componentInfo, arrayToFill, isRangeNeeded }) => {
  const imageArray = fuseComponents({
    componentInfo,
    arrayToFill,
  })
  const componentRanges = isRangeNeeded
    ? await computeRanges(imageArray, componentInfo.length)
    : undefined
  return new registerWebworker.TransferableResponse(
    [imageArray, componentRanges],
    [imageArray.buffer]
  )
})

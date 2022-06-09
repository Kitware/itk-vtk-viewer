import registerWebworker from 'webworker-promise/lib/register'
import { fuseComponents } from './fuseImagesUtils'

registerWebworker(async ({ componentInfo, existingArray }) => {
  const imageArray = fuseComponents({ componentInfo, existingArray })
  return new registerWebworker.TransferableResponse(imageArray, [
    imageArray.buffer,
  ])
})

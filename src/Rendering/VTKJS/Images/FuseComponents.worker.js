import registerWebworker from 'webworker-promise/lib/register'
import { computeRanges } from '../../../IO/Analyze/computeRanges'
import { resampleLabelImage } from '../../../IO/ResampleLabelImage/ResampleLabelImage'
import { parseByComponent, fuseComponents } from './fuseImagesUtils'

const pickRanges = compInfos =>
  compInfos
    .map(({ image: { ranges }, fromComponent }) => ranges?.[fromComponent]) // no ranges in label
    // if missing any range, return undefined
    .reduce((ranges, range) => {
      if (!ranges || !range) return undefined
      return [...ranges, range]
    }, [])
    ?.map(([min, max]) => ({ min, max }))

const ensureSameSize = async images => {
  const maxSize = images.reduce((maxSize, { size }) => {
    return size.map((s, i) => Math.max(s, maxSize[i] ?? 0))
  }, [])

  return await Promise.all(
    images.map(image => {
      if (image.size.every((s, idx) => s === maxSize[idx])) return image

      return resampleLabelImage(maxSize, image)
    })
  )
}

registerWebworker(async ({ image, label, visualizedComponents }) => {
  const [imageResampled, labelResampled] = await ensureSameSize([image, label])

  const [imageByComponent, labelByComponent] = [
    imageResampled,
    labelResampled,
  ].map(image => parseByComponent(image))

  const componentInfo = visualizedComponents.map(
    comp =>
      comp >= 0 ? imageByComponent[comp] : labelByComponent[comp * -1 - 1] // label component index starts at -1
  )

  const imageArray = fuseComponents({
    componentInfo,
  })

  const componentRanges =
    pickRanges(componentInfo) ??
    (await computeRanges(imageArray, componentInfo.length))

  return new registerWebworker.TransferableResponse(
    [imageArray, componentRanges],
    [imageArray.buffer]
  )
})

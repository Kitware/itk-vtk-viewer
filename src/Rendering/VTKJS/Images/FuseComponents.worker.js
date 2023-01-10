import registerWebworker from 'webworker-promise/lib/register'
import { computeRanges } from '../../../IO/Analyze/computeRanges'
import { parseByComponent, fuseComponents } from './fuseImagesUtils'

const arrayProduct = array => array.reduce((product, dim) => product * dim, 1)

const reduceProduct = sizes =>
  sizes.reduce(
    (strides, dimSize) => [...strides, dimSize * strides[strides.length - 1]],
    [1]
  )

const pickRanges = compInfos =>
  compInfos
    .map(({ image: { ranges }, fromComponent }) => ranges?.[fromComponent]) // no ranges in label
    // if missing any range, return undefined
    .reduce((ranges, range) => {
      if (!ranges || !range) return undefined
      return [...ranges, range]
    }, [])
    ?.map(([min, max]) => ({ min, max }))

const ensureSameSize = images => {
  const maxSize = images.reduce((maxSize, { size }) => {
    return size.map((s, i) => Math.max(s, maxSize[i] ?? 0))
  }, [])
  const spacing = images.reduce((maxSize, { spacing }) => {
    return spacing.map((s, i) => Math.min(s, maxSize[i] ?? Infinity))
  }, [])
  const length = arrayProduct(maxSize)

  return images.map(image => {
    const scale = image.size.map((s, i) => s / maxSize[i])
    if (scale.every(s => s === 1)) return image
    const data = new image.data.constructor(length)

    const destStrides = reduceProduct(maxSize)
    const srcStrides = reduceProduct(image.size)

    for (let z = 0; z < maxSize[2] ?? 1; z++) {
      for (let y = 0; y < maxSize[1]; y++) {
        for (let x = 0; x < maxSize[0]; x++) {
          const srcIdxs = [x, y, z].map((src, idx) =>
            Math.floor(src * scale[idx])
          )
          const srcIndex = srcIdxs.reduce(
            (sum, srcIndex, idx) => sum + srcIndex * srcStrides[idx],
            0
          )
          data[z * destStrides[2] + y * destStrides[1] + x * destStrides[0]] =
            image.data[srcIndex]
        }
      }
    }

    return { ...image, spacing, size: maxSize, data }
  })
}

registerWebworker(async ({ image, label, visualizedComponents }) => {
  const [imageResampled, labelResampled] = ensureSameSize([image, label])

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

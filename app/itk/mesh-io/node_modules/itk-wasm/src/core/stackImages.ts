import Image from './Image.js'

import TypedArray from './TypedArray.js'

/** Join an array of sequential image slabs into a single image */
function stackImages (images: Image[]): Image {
  if (images.length < 1) {
    throw Error('At least one images is required.')
  }
  const firstImage = images[0]
  if (firstImage.data === null) {
    throw Error('Image data is null.')
  }
  const result = new Image(firstImage.imageType)
  result.origin = Array.from(firstImage.origin)
  result.spacing = Array.from(firstImage.spacing)
  const dimension = result.imageType.dimension
  result.direction = firstImage.direction.slice()

  const stackOn = dimension - 1

  result.size = Array.from(firstImage.size)
  const stackedSize = images.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.size[stackOn]
  }, 0)
  result.size[stackOn] = stackedSize

  const dataSize = result.size.reduce((accumulator, currentValue) => { return accumulator * currentValue }, 1) * result.imageType.components
  const CTor = firstImage.data.constructor as new(length: number) => typeof firstImage.data
  result.data = new CTor(dataSize)

  let offsetBase = result.imageType.components
  for (let subIndex = 0; subIndex < result.size.length - 1; subIndex++) {
    offsetBase *= result.size[subIndex]
  }
  let stackIndex = 0
  if (result.data != null) {
    for (let index = 0; index < images.length; index++) {
      // @ts-expect-error: error TS2345: Argument of type 'TypedArray' is not assignable to parameter of type 'ArrayLike<number> & ArrayLike<bigint>'.
      result.data.set(images[index].data as TypedArray, offsetBase * stackIndex)
      stackIndex += images[index].size[stackOn]
    }
  } else {
    throw Error('Could not create result image data.')
  }

  return result
}

export default stackImages

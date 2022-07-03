import Image from './Image.js'

function copyImage (image: Image): Image {
  const copy = new Image(image.imageType)
  copy.name = image.name

  copy.origin = Array.from(image.origin)
  copy.spacing = Array.from(image.spacing)
  copy.direction = image.direction.slice()

  copy.size = Array.from(image.size)

  if (image.data !== null) {
    const CTor = image.data.constructor as new(length: number) => typeof image.data
    copy.data = new CTor(image.data.length)
    if (copy.data != null) {
      // @ts-expect-error: error TS2345: Argument of type 'TypedArray' is not assignable to parameter of type 'ArrayLike<number> & ArrayLike<bigint>'
      copy.data.set(image.data, 0)
    }
  }

  return copy
}

export default copyImage

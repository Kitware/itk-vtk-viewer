import MultiscaleChunkedImage from './MultiscaleChunkedImage'
import InMemoryMultiscaleChunkedImage from './InMemoryMultiscaleChunkedImage'

async function toMultiscaleChunkedImage(image, isLabelImage=false) {
  let multiscaleImage = null
  if (image instanceof MultiscaleChunkedImage) {
    multiscaleImage = image
  } else if (!!image && image.imageType !== undefined) {
    let chunkSize = [64, 64, 64]
    if (image.data.length > 2e6) {
      // Keep a single chunk
      chunkSize = image.size
    } else if (image.imageType.dimension === 2) {
      chunkSize = [256, 256]
    }

    const {
      metadata,
      imageType,
      pyramid,
    } = await InMemoryMultiscaleChunkedImage.buildPyramid(image, chunkSize, isLabelImage)
    multiscaleImage = new InMemoryMultiscaleChunkedImage(
      pyramid,
      metadata,
      imageType,
      image.name
    )
  } else {
    throw new Error('Unexpected image')
  }

  return multiscaleImage
}

export default toMultiscaleChunkedImage

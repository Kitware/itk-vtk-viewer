import { readImageArrayBuffer } from 'itk-wasm'

import MultiscaleSpatialImage from './MultiscaleSpatialImage'
import InMemoryMultiscaleSpatialImage from './InMemoryMultiscaleSpatialImage'
import ZarrMultiscaleSpatialImage, {
  isZarr,
} from './ZarrMultiscaleSpatialImage'
import ndarrayToItkImage from './ndarrayToItkImage'
import fetchBinaryContent from './fetchBinaryContent'

async function itkImageToInMemoryMultiscaleSpatialImage(image, isLabelImage) {
  let chunkSize = [64, 64, 64]
  if (image.data.length < 2e6) {
    // Keep a single chunk
    chunkSize = image.size
  } else if (image.imageType.dimension === 2) {
    chunkSize = [256, 256]
  }

  const {
    scaleInfo,
    imageType,
    pyramid,
  } = await InMemoryMultiscaleSpatialImage.buildPyramid(
    image,
    chunkSize,
    isLabelImage
  )
  const multiscaleImage = new InMemoryMultiscaleSpatialImage(
    pyramid,
    scaleInfo,
    imageType,
    image.name
  )

  return multiscaleImage
}

async function toMultiscaleSpatialImage(image, isLabelImage = false) {
  let multiscaleImage = null
  if (image instanceof MultiscaleSpatialImage) {
    // Already a multi-scale, chunked image
    multiscaleImage = image
  } else if (image.imageType !== undefined) {
    // itk-wasm Image
    multiscaleImage = await itkImageToInMemoryMultiscaleSpatialImage(
      image,
      isLabelImage
    )
  } else if (typeof image.getItem === 'function') {
    // key value store
    multiscaleImage = ZarrMultiscaleSpatialImage.fromStore(image)
  } else if (image._rtype !== undefined && image._rtype === 'ndarray') {
    // ndarray
    const itkImage = ndarrayToItkImage(image)
    multiscaleImage = await itkImageToInMemoryMultiscaleSpatialImage(
      itkImage,
      isLabelImage
    )
  } else if (image.href !== undefined) {
    if (isZarr(image.href)) {
      multiscaleImage = ZarrMultiscaleSpatialImage.fromUrl(image)
    } else {
      const dataBuffer = await fetchBinaryContent(image)
      const { image: itkImage, webWorker } = await readImageArrayBuffer(
        null,
        dataBuffer,
        image.pathname.split('/').pop()
      )
      webWorker.terminate()
      multiscaleImage = await itkImageToInMemoryMultiscaleSpatialImage(
        itkImage,
        isLabelImage
      )
    }
  } else {
    throw new Error('Unexpected image')
  }

  return multiscaleImage
}

export default toMultiscaleSpatialImage

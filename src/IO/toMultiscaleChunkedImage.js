import { readImageArrayBuffer, getFileExtension } from 'itk-wasm'

import ConsolidatedMetadataStore from './ConsolidatedMetadataStore'
import MultiscaleChunkedImage from './MultiscaleChunkedImage'
import InMemoryMultiscaleChunkedImage from './InMemoryMultiscaleChunkedImage'
import ZarrMultiscaleChunkedImage from './ZarrMultiscaleChunkedImage'
import ndarrayToItkImage from './ndarrayToItkImage'
import fetchBinaryContent from './fetchBinaryContent'

async function itkImageToInMemoryMultiscaleChunkedImage(image, isLabelImage) {
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
  } = await InMemoryMultiscaleChunkedImage.buildPyramid(
    image,
    chunkSize,
    isLabelImage
  )
  const multiscaleImage = new InMemoryMultiscaleChunkedImage(
    pyramid,
    scaleInfo,
    imageType,
    image.name
  )

  return multiscaleImage
}

async function toMultiscaleChunkedImage(image, isLabelImage = false) {
  let multiscaleImage = null
  if (image instanceof MultiscaleChunkedImage) {
    // Already a multi-scale, chunked image
    multiscaleImage = image
  } else if (image.imageType !== undefined) {
    // itk.js Image
    multiscaleImage = await itkImageToInMemoryMultiscaleChunkedImage(
      image,
      isLabelImage
    )
  } else if (
    typeof image.getItem === 'function' &&
    typeof image.containsItem === 'function'
  ) {
    // Zarr store
    const store = image
    const {
      scaleInfo,
      imageType,
    } = await ZarrMultiscaleChunkedImage.extractScaleInfo(store)
    multiscaleImage = new ZarrMultiscaleChunkedImage(
      store,
      scaleInfo,
      imageType
    )
  } else if (image._rtype !== undefined && image._rtype === 'ndarray') {
    // ndarray
    const itkImage = ndarrayToItkImage(image)
    multiscaleImage = await itkImageToInMemoryMultiscaleChunkedImage(
      itkImage,
      isLabelImage
    )
  } else if (image.href !== undefined) {
    const imageHref = image.href
    const extension = getFileExtension(imageHref)
    if (extension === 'zarr') {
      const metadata = await ConsolidatedMetadataStore.retrieveMetadata(image)
      const store = new ConsolidatedMetadataStore(image, metadata)
      const {
        scaleInfo,
        imageType,
      } = await ZarrMultiscaleChunkedImage.extractScaleInfo(store)
      multiscaleImage = new ZarrMultiscaleChunkedImage(
        store,
        scaleInfo,
        imageType
      )
    } else {
      const dataBuffer = await fetchBinaryContent(imageHref)
      const { image: itkImage, webWorker } = await readImageArrayBuffer(
        null,
        dataBuffer,
        imageHref.split('/').slice(-1)[0]
      )
      webWorker.terminate()
      multiscaleImage = await itkImageToInMemoryMultiscaleChunkedImage(
        itkImage,
        isLabelImage
      )
    }
  } else {
    throw new Error('Unexpected image')
  }

  return multiscaleImage
}

export default toMultiscaleChunkedImage

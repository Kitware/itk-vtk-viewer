import axios from 'axios'

import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract'
import { readImageArrayBuffer } from 'itk-wasm'

import fetchBinaryContent from './IO/fetchBinaryContent'
import fetchJsonContent from './IO/fetchJsonContent'
import { processFiles } from './IO/processFiles'
import UserInterface from './UserInterface'
import createFileDragAndDrop from './UserInterface/createFileDragAndDrop'
import style from './UserInterface/ItkVtkViewer.module.css'
import toMultiscaleSpatialImage from './IO/toMultiscaleSpatialImage'
import { ConglomerateMultiscaleSpatialImage } from './IO/ConglomerateMultiscaleSpatialImage'
import { isZarr } from './IO/ZarrMultiscaleSpatialImage'

import imJoyPluginAPI from './imJoyPluginAPI'
import imJoyCodecs from './imJoyCodecs.js'
import packageJson from '../package.json'
const { version } = packageJson

let doNotInitViewers = false

export { version }
export { imJoyPluginAPI }
export { imJoyCodecs }
export { default as createViewer } from './createViewer'
import * as utils from './utils.js'
export { utils }

// The `UserInterface` is considered an internal implementation detail
// and its interface and behavior may change without changes to the major version.
export { UserInterface }

/** Returns a Promise that revolves with the Viewer created the files. */
export function createViewerFromLocalFiles(container) {
  doNotInitViewers = true
  return createFileDragAndDrop(container, processFiles)
}

export async function createViewerFromFiles(el, files, use2D = false) {
  return processFiles(el, { files: files, use2D })
}

async function makeImage({ image, progressCallback, isLabelImage = false }) {
  if (!image) return null

  const imageUrlObj = new URL(image, document.location)

  if (isZarr(image)) {
    return await toMultiscaleSpatialImage(imageUrlObj, isLabelImage)
  }

  const result = await readImageArrayBuffer(
    null,
    await fetchBinaryContent(imageUrlObj, progressCallback),
    imageUrlObj.pathname.split('/').pop()
  )
  result.webWorker.terminate()
  return await toMultiscaleSpatialImage(result.image)
}

async function parseImageArg(image, progressCallback) {
  if (!image) return null

  const images = await Promise.all(
    image.split(',').map(image => makeImage({ image, progressCallback }))
  )

  return images.length > 1
    ? new ConglomerateMultiscaleSpatialImage(images)
    : images[0]
}

export async function createViewerFromUrl(
  el,
  {
    files = [],
    image,
    labelImage,
    config,
    labelImageNames = null,
    rotate = true,
    use2D = false,
    ...rest
  }
) {
  UserInterface.emptyContainer(el)
  const progressCallback = UserInterface.createLoadingProgress(el)

  let fetchedImage
  const fileObjects = []
  for (const url of files) {
    const urlObj = new URL(url, document.location)
    if (isZarr(url)) {
      fetchedImage = await toMultiscaleSpatialImage(urlObj)
    } else {
      const arrayBuffer = await fetchBinaryContent(urlObj, progressCallback)
      fileObjects.push(
        new File([new Blob([arrayBuffer])], urlObj.pathname.split('/').pop())
      )
    }
  }

  // No image in files? Check image arg.
  fetchedImage = fetchedImage ?? (await parseImageArg(image, progressCallback))

  const labelImageObject = await makeImage({
    image: labelImage,
    progressCallback,
    isLabelImage: true,
  })

  let viewerConfig = null
  if (config) {
    const response = await axios.get(config, {
      responseType: 'json',
    })
    viewerConfig = response.data
  }

  let labelImageNameObject = null
  if (labelImageNames) {
    labelImageNameObject = await fetchJsonContent(labelImageNames)
  }

  return processFiles(el, {
    files: fileObjects,
    image: fetchedImage,
    labelImage: labelImageObject,
    config: viewerConfig,
    labelImageNames: labelImageNameObject,
    rotate,
    use2D,
    ...rest,
  })
}

const parseBoolean = datasetValue =>
  datasetValue !== undefined ? datasetValue.toLowerCase() === 'true' : undefined

export function initializeEmbeddedViewers() {
  if (doNotInitViewers) {
    return
  }
  const viewers = document.querySelectorAll('.itk-vtk-viewer')
  let count = viewers.length
  while (count--) {
    const el = viewers[count]
    if (!el.dataset.loaded) {
      el.dataset.loaded = true
      // Apply size to conatiner
      const [width, height] = (el.dataset.viewport || '500x500').split('x')
      el.style.position = 'relative'
      el.style.width = Number.isFinite(Number(width)) ? `${width}px` : width
      el.style.height = Number.isFinite(Number(height)) ? `${height}px` : height
      const files = el.dataset.url.split(',')
      createViewerFromUrl(el, {
        files,
        use2D: parseBoolean(el.dataset.use2d),
        rotate: parseBoolean(el.dataset.rotate),
      }).then(viewer => {
        // Background color handling
        if (el.dataset.backgroundColor) {
          const color = el.dataset.backgroundColor
          const bgColor = [
            color.slice(0, 2),
            color.slice(2, 4),
            color.slice(4, 6),
          ].map(v => parseInt(v, 16) / 255)
          viewer.setBackgroundColor(bgColor)
        }

        viewer.setUICollapsed(true)
        // Render
        if (viewer.renderWindow && viewer.renderWindow.render) {
          viewer.renderWindow.render()
        }
        el.dataset.viewer = viewer
      })
    }
  }
}

export function processURLParameters(container, addOnParameters = {}) {
  const userParams = Object.assign(
    {},
    vtkURLExtract.extractURLParameters(),
    addOnParameters
  )

  if (userParams.gradientOpacity && isNaN(userParams.gradientOpacity))
    throw new Error('gradientOpacity URL paramter is not a number')

  const myContainer = UserInterface.getRootContainer(container)

  if (userParams.fullscreen) {
    myContainer.classList.add(style.fullscreenContainer)
  }

  const files = userParams.fileToLoad?.split(',') ?? []

  if (files.length || userParams.image || userParams.labelImage) {
    return createViewerFromUrl(myContainer, {
      files,
      image: userParams.image,
      labelImage: userParams.labelImage,
      config: userParams.config,
      labelImageNames: userParams.labelImageNames,
      rotate: userParams.rotate ?? true,
      use2D: !!userParams.use2D,
      gradientOpacity: userParams.gradientOpacity,
    })
  }
  return null
}

// Ensure processing of embedded viewers
setTimeout(initializeEmbeddedViewers, 100)

import axios from 'axios'

import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract'
import getFileExtension from 'itk/getFileExtension'

import fetchBinaryContent from './IO/fetchBinaryContent'
import fetchJsonContent from './IO/fetchJsonContent'
import { processFiles } from './IO/processFiles'
import UserInterface from './UserInterface'
import createFileDragAndDrop from './UserInterface/createFileDragAndDrop'
import style from './UserInterface/ItkVtkViewer.module.css'
import toMultiscaleChunkedImage from './IO/toMultiscaleChunkedImage'
import readImageArrayBuffer from 'itk/readImageArrayBuffer'
import createViewer from './createViewer'

import imJoyPluginAPI from './imJoyPluginAPI'
import packageJson from '../package.json'
const { version } = packageJson

let doNotInitViewers = false

export { version }
export { imJoyPluginAPI }
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
  }
) {
  UserInterface.emptyContainer(el)
  const progressCallback = UserInterface.createLoadingProgress(el)

  let imageObject = null
  if (!!image) {
    const extension = getFileExtension(image)
    if (extension === 'zarr') {
      imageObject = await toMultiscaleChunkedImage(new URL(image))
    } else {
      const arrayBuffer = await fetchBinaryContent(image, progressCallback)
      const result = await readImageArrayBuffer(
        null,
        arrayBuffer,
        image.split('/').slice(-1)[0]
      )
      result.webWorker.terminate()
      imageObject = result.image
    }
  }

  let labelImageObject = null
  if (!!labelImage) {
    const extension = getFileExtension(labelImage)
    if (extension === 'zarr') {
      labelImageObject = await toMultiscaleChunkedImage(
        new URL(labelImage),
        true
      )
    } else {
      const arrayBuffer = await fetchBinaryContent(labelImage, progressCallback)
      const result = await readImageArrayBuffer(
        null,
        arrayBuffer,
        labelImage.split('/').slice(-1)[0]
      )
      result.webWorker.terminate()
      labelImageObject = result.image
    }
  }

  const fileObjects = []
  for (const url of files) {
    const extension = getFileExtension(url)
    if (extension === 'zarr') {
      imageObject = await toMultiscaleChunkedImage(new URL(url))
    } else {
      const arrayBuffer = await fetchBinaryContent(url, progressCallback)
      fileObjects.push(
        new File([new Blob([arrayBuffer])], url.split('/').slice(-1)[0])
      )
    }
  }

  let viewerConfig = null
  if (config) {
    const response = await axios.get(config, {
      responseType: 'json',
    })
    viewerConfig = response.data
  }

  let labelImageNameObject = null
  if (!!labelImageNames) {
    labelImageNameObject = await fetchJsonContent(labelImageNames)
  }

  return processFiles(el, {
    files: fileObjects,
    image: imageObject,
    labelImage: labelImageObject,
    config: viewerConfig,
    labelImageNames: labelImageNameObject,
    rotate,
    use2D,
  })
}

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
        use2D: !!el.dataset.use2D,
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

        viewer.setUserInterfaceCollapsed(true)
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
  const myContainer = UserInterface.getRootContainer(container)

  if (userParams.fullscreen) {
    myContainer.classList.add(style.fullscreenContainer)
  }

  let filesToLoad = []
  if (userParams.fileToLoad) {
    filesToLoad = userParams.fileToLoad.split(',')
  }
  if (userParams.filesToLoad) {
    filesToLoad = userParams.filesToLoad.split(',')
  }
  let rotate = true
  if (typeof userParams.rotate !== 'undefined') {
    rotate = userParams.rotate
  }
  let config = null
  if (typeof userParams.config !== 'undefined') {
    config = userParams.config
  }

  if (filesToLoad.length || userParams.image || userParams.labelImage) {
    return createViewerFromUrl(myContainer, {
      files: filesToLoad,
      image: userParams.image,
      labelImage: userParams.labelImage,
      config,
      labelImageNames: userParams.labelImageNames,
      rotate,
      use2D: !!userParams.use2D,
    })
  }
  return null
}

// Ensure processing of embedded viewers
setTimeout(initializeEmbeddedViewers, 100)

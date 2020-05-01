import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract'
import getFileExtension from 'itk/getFileExtension'

import fetchBinaryContent from './fetchBinaryContent'
import { processFiles } from './processFiles'
import UserInterface from './UserInterface'
import createFileDragAndDrop from './UserInterface/createFileDragAndDrop'
import style from './UserInterface/ItkVtkViewer.module.css'
import ZarrMultiscaleManager from './ZarrMultiscaleManager'
import createViewer from './createViewer'

let doNotInitViewers = false

export { default as createViewer } from './createViewer'
import * as utils from './utils.js'
export { utils }

// The `UserInterface` is considered an internal implementation detail
// and its interface and behavior may change without changes to the major version.
export { UserInterface }

export function createViewerFromLocalFiles(container) {
  doNotInitViewers = true
  createFileDragAndDrop(container, processFiles)
}

export async function createViewerFromFiles(el, files, use2D = false) {
  return processFiles(el, { files: files, use2D })
}

export async function createViewerFromUrl(el, filesToLoad, use2D = false) {
  UserInterface.emptyContainer(el)
  const progressCallback = UserInterface.createLoadingProgress(el)
  const url = filesToLoad[0]
  const extension = getFileExtension(url)
  if (extension === 'zarr') {
    console.time('meta')
    console.time('image')
    const metadata = await ZarrMultiscaleManager.parseMetadata(url)
    console.timeEnd('meta')
    const multiscaleImage = new ZarrMultiscaleManager(url, metadata)
    // Side effect to keep the spinner going
    const topLevelLargestImage = await multiscaleImage.topLevelLargestImage()
    console.timeEnd('image')
    return createViewer(el, {
      multiscaleImage,
      use2D,
    })
  } else {
    const files = []
    for (const url of filesToLoad) {
      const arrayBuffer = await fetchBinaryContent(url, progressCallback)
      files.push(
        new File([new Blob([arrayBuffer])], url.split('/').slice(-1)[0])
      )
    }

    return processFiles(el, { files, use2D })
  }
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
      createViewerFromUrl(el, files, !!el.dataset.use2D).then(viewer => {
        // Background color handling
        if (el.dataset.backgroundColor) {
          const color = el.dataset.backgroundColor
          const bgColor = [
            color.slice(0, 2),
            color.slice(2, 4),
            color.slice(4, 6),
          ].map(v => parseInt(v, 16) / 255)
          console.log(bgColor)
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

  if (userParams[keyName]) {
    return createViewerFromUrl(
      myContainer,
      userParams[keyName].split(','),
      !!userParams.use2D
    )
  }
  return null
}

// Ensure processing of embedded viewers
setTimeout(initializeEmbeddedViewers, 100)

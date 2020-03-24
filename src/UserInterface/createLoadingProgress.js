import getRootContainer from './getRootContainer'

import style from './ItkVtkViewer.module.css'

function createLoadingProgress(container) {
  const rootContainer = getRootContainer(container)

  const loading = document.createElement('div')
  loading.setAttribute('class', style.loading)
  rootContainer.appendChild(loading)

  const progressContainer = document.createElement('div')
  progressContainer.setAttribute('class', style.progress)
  rootContainer.appendChild(progressContainer)

  function progressCallback(progressEvent) {
    const percent = Math.floor(
      (100 * progressEvent.loaded) / progressEvent.total
    )
    progressContainer.innerHTML = `${percent}%`
  }

  return progressCallback
}

export default createLoadingProgress

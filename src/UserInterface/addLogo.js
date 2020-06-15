import style from './ItkVtkViewer.module.css'

import logoIcon from './icons/logo.png'

import vtkFPSMonitor from 'vtk.js/Sources/Interaction/UI/FPSMonitor'

function addLogo(store) {
  const logo = new Image()
  logo.src = logoIcon
  logo.setAttribute('class', style.logo)
  store.container.appendChild(logo)

  // "Right click"
  logo.addEventListener('contextmenu', () => {
    logo.style.display = 'none'
    if (!store.fpsMonitor) {
      const fpsMonitor = vtkFPSMonitor.newInstance()
      const fpsElement = fpsMonitor.getFpsMonitorContainer()
      fpsElement.setAttribute('class', style.fpsMonitor)

      fpsMonitor.setContainer(store.container)
      fpsMonitor.setBufferSize(100)
      fpsMonitor.setRenderWindow(store.renderWindow)
      fpsMonitor.update()
      store.fpsMonitor = fpsMonitor
    }
  })

  logo.addEventListener('click', () => {
    logo.style.display = 'none'
    if (!store.appAttribution) {
      const appAttribution = document.createElement('div')
      appAttribution.setAttribute('class', style.fpsMonitor)
      appAttribution.innerHTML = `
      <p style="border:2px; border-radius: 3px; border-style:solid; border-color:#4488BB; padding: 1em;"><a href="https://kitware.github.io/itk-vtk-viewer/index.html">itk-vtk-viewer</a> development is <br>lead by the hearts and minds at <br> <a href="https://www.kitware.com">Kitware</a>.</p>`
      store.container.appendChild(appAttribution)
      store.appAttribution = appAttribution
    }
  })
}

export default addLogo

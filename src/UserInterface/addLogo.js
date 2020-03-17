import style from './ItkVtkViewer.module.css';

import logoIcon from './icons/logo.png';

import vtkFPSMonitor from 'vtk.js/Sources/Interaction/UI/FPSMonitor';

function addLogo(store) {
  const logo = new Image();
  logo.src = logoIcon;
  logo.setAttribute('class', style.logo);
  store.container.appendChild(logo);

  logo.addEventListener('click', () => {
    if (!store.fpsMonitor) {
      logo.style.display = 'none';

      const fpsMonitor = vtkFPSMonitor.newInstance();
      const fpsElement = fpsMonitor.getFpsMonitorContainer();
      fpsElement.setAttribute('class', style.fpsMonitor);

      fpsMonitor.setContainer(store.container);
      fpsMonitor.setBufferSize(100);
      fpsMonitor.setRenderWindow(store.renderWindow);
      fpsMonitor.update();
      store.fpsMonitor = fpsMonitor;
    }
  })
}

export default addLogo;

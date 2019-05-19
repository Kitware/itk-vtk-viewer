import style from './ItkVtkViewer.module.css';

import logoIcon from './icons/logo.png';

function addLogo(uiContainer) {
  const logo = new Image();
  logo.src = logoIcon;
  logo.setAttribute('class', style.logo);
  uiContainer.appendChild(logo);
}

export default addLogo;

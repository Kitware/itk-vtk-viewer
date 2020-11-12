import style from '../ItkVtkViewer.module.css'

import createComponentSelector from './createComponentSelector'

function createImagesInterface(context) {
  const imagesUIGroup = document.createElement('div')
  imagesUIGroup.setAttribute('class', style.uiGroup)
  context.images.imagesUIGroup = imagesUIGroup

  const componentSelector = createComponentSelector(context, imagesUIGroup)

  context.uiContainer.appendChild(imagesUIGroup)
}

export default createImagesInterface

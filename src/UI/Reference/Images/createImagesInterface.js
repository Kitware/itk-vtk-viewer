import style from '../ItkVtkViewer.module.css'

function createImagesInterface(context) {
  const imagesUIGroup = document.createElement('div')
  imagesUIGroup.setAttribute('class', style.uiGroup)

  const imagesUIRow1 = document.createElement('div')
  imagesUIRow1.setAttribute('class', style.imagesUIRow)
  imagesUIRow1.className += ` ${context.id}-collapsible`
  imagesUIGroup.appendChild(imagesUIRow1)

  context.uiContainer.appendChild(imagesUIGroup)
}

export default createImagesInterface

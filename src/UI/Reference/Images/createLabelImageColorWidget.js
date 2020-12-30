import macro from 'vtk.js/Sources/macro'
import createCategoricalColorIconSelector from '../createCategoricalColorIconSelector'
//import applyCategoricalColorToLookupTableProxy from '../applyCategoricalColorToLookupTableProxy'
//import updateLabelImageComponentWeight from '../../Rendering/updateLabelImageComponentWeight'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import opacityIcon from '../../Icons/opacity.svg'

function createLabelImageColorWidget(context) {
  const viewerDOMId = context.id

  const labelImageColorUIGroup = document.createElement('div')
  context.images.labelImageColorUIGroup = labelImageColorUIGroup
  labelImageColorUIGroup.setAttribute('class', style.uiGroup)

  const labelImageWidgetRow = document.createElement('div')
  labelImageWidgetRow.setAttribute('class', style.uiRow)
  labelImageWidgetRow.className += ` ${viewerDOMId}-collapsible`

  const categoricalColorSelector = document.createElement('div')
  categoricalColorSelector.id = `${context.id}-labelImageLookupTableSelector`

  const iconSelector = createCategoricalColorIconSelector(
    categoricalColorSelector
  )

  let customIcon = null
  function updateDisplayedCategoricalColor() {
    const categoricalColor = context.imageUI.labelImageLookupTable

    const lookupTableProxy = context.imageUI.labelImageLookupTableProxy
    const colorTransferFunction = lookupTableProxy.getLookupTable()

    if (categoricalColor.startsWith('Custom')) {
      // TODO
      //lookupTableProxy.setMode(vtkLookupTableProxy.Mode.RGBPoints)
      //transferFunctionWidget.applyOpacity(piecewiseFunction);
      //const colorDataRange = transferFunctionWidget.getOpacityRange();
      //if (!!colorDataRange) {
      //colorTransferFunction.setMappingRange(...colorDataRange);
      //}
      //colorTransferFunction.updateRange();
      //const isIcons = iconSelector.getIcons();
      //if (!!!customIcon) {
      //const categoricalColorIcon = customColorMapIcon(colorTransferFunction, colorDataRange);
      //customIcon = { 'iconFilePath': categoricalColorIcon, 'iconValue': categoricalColor };
      //icons.push(customIcon);
      //iconSelector.refresh(icons);
      //} else if(isIcons[isIcons.length-1].iconValue !== categoricalColor) {
      //const categoricalColorIcon = customColorMapIcon(colorTransferFunction, colorDataRange);
      //isIcons[isIcons.length-1].element.src = categoricalColorIcon;
      //isIcons[isIcons.length-1].iconFilePath = categoricalColorIcon;
      //isIcons[isIcons.length-1].iconValue = categoricalColor;
      //isIcons[isIcons.length-1].element.setAttribute('icon-value', categoricalColor);
      //isIcons[isIcons.length-1].element.setAttribute('alt', categoricalColor);
      //isIcons[isIcons.length-1].element.setAttribute('title', categoricalColor);
      //}
    } else {
      applyCategoricalColorToLookupTableProxy(
        lookupTableProxy,
        context.imageUI.labelImageLabels,
        categoricalColor
      )
    }
    iconSelector.setSelectedValue(categoricalColor)

    const renderWindow = context.renderWindow
    if (!renderWindow.getInteractor().isAnimating()) {
      renderWindow.render()
    }
  }
  //reaction(
  //() => {
  //return context.imageUI.labelImageLookupTable
  //},
  //categoricalColor => {
  //updateDisplayedCategoricalColor()
  //}
  //)
  categoricalColorSelector.addEventListener('changed', event => {
    event.preventDefault()
    event.stopPropagation()
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const lut = iconSelector.getSelectedValue()
    context.service.send({
      type: 'LABEL_IMAGE_LOOKUP_TABLE_CHANGED',
      data: { name, lookupTable: lut },
    })
    context.imageUI.labelImageLookupTable = iconSelector.getSelectedValue()
  })
  //iconSelector.setSelectedValue(context.imageUI.labelImageLookupTable)

  //const sliderEntry = document.createElement('div')
  //sliderEntry.setAttribute('class', style.sliderEntry)
  //sliderEntry.innerHTML = `
  //<div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Label map blend" class="${style.gradientOpacitySlider}">
  //${opacityIcon}
  //</div>
  //<input type="range" min="0" max="1" value="${context.imageUI.labelImageBlend}" step="0.01"
  //id="${context.id}-labelImageColorOpacitySlider"
  //class="${style.slider}" />`
  //const opacityElement = sliderEntry.querySelector(
  //`#${context.id}-labelImageColorOpacitySlider`
  //)
  //const sliderEntryDiv = sliderEntry.children[0]
  //applyContrastSensitiveStyle(context, 'invertibleButton', sliderEntryDiv)
  //function updateLabelImageColorOpacity() {
  //const labelImageBlend = context.imageUI.labelImageBlend
  //opacityElement.value = labelImageBlend
  //updateLabelImageComponentWeight(context)
  //context.renderWindow.render()
  //}
  //reaction(() => {
  //return context.imageUI.labelImageBlend
  //}, macro.throttle(updateLabelImageColorOpacity, 20))
  //updateLabelImageColorOpacity()
  //opacityElement.addEventListener(
  //'input',
  //action(event => {
  //event.preventDefault()
  //event.stopPropagation()
  //context.imageUI.labelImageBlend = Number(opacityElement.value)
  //})
  //)
  //autorun(() => {
  //const haveImage = !!context.imageUI.image
  //if (haveImage) {
  //sliderEntry.style.display = 'flex'
  //} else {
  //sliderEntry.style.display = 'none'
  //}
  //})

  //labelImageWidgetRow.appendChild(categoricalColorSelector)
  //labelImageWidgetRow.appendChild(sliderEntry)

  //labelImageColorUIGroup.appendChild(labelImageWidgetRow)
  //uiContainer.appendChild(labelImageColorUIGroup)
}

export default createLabelImageColorWidget

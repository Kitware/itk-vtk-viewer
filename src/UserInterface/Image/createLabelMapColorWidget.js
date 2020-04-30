import { autorun, reaction, action } from 'mobx'

import macro from 'vtk.js/Sources/macro'
import createCategoricalColorIconSelector from '../createCategoricalColorIconSelector'
import applyCategoricalColorToLookupTableProxy from '../applyCategoricalColorToLookupTableProxy'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

import opacityIcon from '../icons/opacity.svg'

function createLabelMapColorWidget(store, uiContainer) {
  const viewerDOMId = store.id

  const labelMapColorUIGroup = document.createElement('div')
  labelMapColorUIGroup.setAttribute('class', style.uiGroup)
  // This group has a sub-component that drops down and needs to appear
  // above components in the "uiGroup" below.
  labelMapColorUIGroup.setAttribute(
    'style',
    'position: relative; z-index: 1001;'
  )

  const labelMapWidgetRow = document.createElement('div')
  labelMapWidgetRow.setAttribute('class', style.uiRow)
  labelMapWidgetRow.className += ` ${viewerDOMId}-toggle`

  const categoricalColorSelector = document.createElement('div')
  categoricalColorSelector.id = `${store.id}-labelMapCategoricalColorSelector`

  const iconSelector = createCategoricalColorIconSelector(
    categoricalColorSelector
  )

  let customIcon = null
  function updateDisplayedCategoricalColor() {
    const categoricalColor = store.imageUI.labelMapCategoricalColor

    const lookupTableProxy = store.imageUI.labelMapLookupTableProxy
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
        store.imageUI.labelMapLabels,
        categoricalColor
      )
    }
    iconSelector.setSelectedValue(categoricalColor)

    const renderWindow = store.renderWindow
    if (!renderWindow.getInteractor().isAnimating()) {
      renderWindow.render()
    }
  }
  reaction(
    () => {
      return store.imageUI.labelMapCategoricalColor
    },
    categoricalColor => {
      updateDisplayedCategoricalColor()
    }
  )
  categoricalColorSelector.addEventListener(
    'changed',
    action(event => {
      event.preventDefault()
      event.stopPropagation()
      store.imageUI.labelMapCategoricalColor = iconSelector.getSelectedValue()
    })
  )
  iconSelector.setSelectedValue(store.imageUI.labelMapCategoricalColor)

  const sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Labelmap opacity" class="${style.gradientOpacitySlider}">
      ${opacityIcon}
    </div>
    <input type="range" min="0" max="1" value="${store.imageUI.labelMapOpacity}" step="0.01"
      id="${store.id}-labelMapColorOpacitySlider"
      class="${style.slider}" />`
  const opacityElement = sliderEntry.querySelector(
    `#${store.id}-labelMapColorOpacitySlider`
  )
  const sliderEntryDiv = sliderEntry.children[0]
  applyContrastSensitiveStyle(store, 'invertibleButton', sliderEntryDiv)
  const volume = store.imageUI.representationProxy.getVolumes()[0]
  const volumeProperty = volume.getProperty()
  const sliceActor = store.imageUI.representationProxy.getActors()[0]
  const sliceProperty = sliceActor.getProperty()
  function updateLabelMapColorOpacity() {
    const labelMapOpacity = store.imageUI.labelMapOpacity
    opacityElement.value = labelMapOpacity
    const numberOfComponents = store.imageUI.numberOfComponents
    for (let c = 0; c < numberOfComponents; c++) {
      volumeProperty.setComponentWeight(c, 1.0 - labelMapOpacity)
      sliceProperty.setComponentWeight(c, 1.0 - labelMapOpacity)
    }
    volumeProperty.setComponentWeight(numberOfComponents, labelMapOpacity)
    sliceProperty.setComponentWeight(numberOfComponents, labelMapOpacity)
    store.renderWindow.render()
  }
  reaction(() => {
    return store.imageUI.labelMapOpacity
  }, macro.debounce(updateLabelMapColorOpacity, 25))
  updateLabelMapColorOpacity()
  opacityElement.addEventListener(
    'input',
    action(event => {
      event.preventDefault()
      event.stopPropagation()
      store.imageUI.labelMapOpacity = Number(opacityElement.value)
    })
  )
  autorun(() => {
    const haveImage = !!store.imageUI.image
    if (haveImage) {
      sliderEntry.style.display = 'flex'
    } else {
      sliderEntry.style.display = 'none'
    }
  })

  labelMapWidgetRow.appendChild(categoricalColorSelector)
  labelMapWidgetRow.appendChild(sliderEntry)

  labelMapColorUIGroup.appendChild(labelMapWidgetRow)
  uiContainer.appendChild(labelMapColorUIGroup)
}

export default createLabelMapColorWidget

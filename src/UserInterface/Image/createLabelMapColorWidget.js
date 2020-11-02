import { autorun, reaction, action } from 'mobx'

import macro from 'vtk.js/Sources/macro'
import createCategoricalColorIconSelector from '../createCategoricalColorIconSelector'
import applyCategoricalColorToLookupTableProxy from '../applyCategoricalColorToLookupTableProxy'
import updateLabelMapComponentWeight from '../../Rendering/updateLabelMapComponentWeight'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

import opacityIcon from '../icons/opacity.svg'

function createLabelMapColorWidget(store, uiContainer) {
  const viewerDOMId = store.id

  const labelMapColorUIGroup = document.createElement('div')
  store.imageUI.labelMapColorUIGroup = labelMapColorUIGroup
  labelMapColorUIGroup.setAttribute('class', style.uiGroup)

  const labelMapWidgetRow = document.createElement('div')
  labelMapWidgetRow.setAttribute('class', style.uiRow)
  labelMapWidgetRow.className += ` ${viewerDOMId}-collapsible`

  const categoricalColorSelector = document.createElement('div')
  categoricalColorSelector.id = `${store.id}-labelMapLookupTableSelector`

  const iconSelector = createCategoricalColorIconSelector(
    categoricalColorSelector
  )

  let customIcon = null
  function updateDisplayedCategoricalColor() {
    const categoricalColor = store.imageUI.labelMapLookupTable

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
      return store.imageUI.labelMapLookupTable
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
      store.imageUI.labelMapLookupTable = iconSelector.getSelectedValue()
    })
  )
  iconSelector.setSelectedValue(store.imageUI.labelMapLookupTable)

  const sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Label map blend" class="${style.gradientOpacitySlider}">
      ${opacityIcon}
    </div>
    <input type="range" min="0" max="1" value="${store.imageUI.labelMapBlend}" step="0.01"
      id="${store.id}-labelMapColorOpacitySlider"
      class="${style.slider}" />`
  const opacityElement = sliderEntry.querySelector(
    `#${store.id}-labelMapColorOpacitySlider`
  )
  const sliderEntryDiv = sliderEntry.children[0]
  applyContrastSensitiveStyle(store, 'invertibleButton', sliderEntryDiv)
  function updateLabelMapColorOpacity() {
    const labelMapBlend = store.imageUI.labelMapBlend
    opacityElement.value = labelMapBlend
    updateLabelMapComponentWeight(store)
    store.renderWindow.render()
  }
  reaction(() => {
    return store.imageUI.labelMapBlend
  }, macro.throttle(updateLabelMapColorOpacity, 20))
  updateLabelMapColorOpacity()
  opacityElement.addEventListener(
    'input',
    action(event => {
      event.preventDefault()
      event.stopPropagation()
      store.imageUI.labelMapBlend = Number(opacityElement.value)
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

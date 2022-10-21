import { IconSelect } from '@thewtex/iconselect.js/lib/control/iconselect'
import { ColorMapIcons, CategoricalColorIcons } from 'itk-viewer-color-maps'

function createColorMapIconSelector(colorMapSelectorDiv) {
  const rows = 20
  const cols = 4
  const iconSelectParameters = {
    selectedIconWidth: 170,
    selectedIconHeight: 22,
    selectedBoxPadding: 1,
    iconsWidth: 80,
    iconsHeight: 22,
    boxIconSpace: 1,
    vectoralIconNumber: cols,
    horizontalIconNumber: rows,
  }
  const iconSelect = new IconSelect(
    `${colorMapSelectorDiv.id}`,
    colorMapSelectorDiv,
    iconSelectParameters
  )
  colorMapSelectorDiv.style.width = '186px'
  // put above lower down label map color selector
  colorMapSelectorDiv.style.zIndex = '2001'

  const filteredIcons = new Map(
    Array.from(ColorMapIcons.entries()).concat(
      Array.from(CategoricalColorIcons.entries()).filter(
        ([name]) => !name.startsWith('modulate')
      )
    )
  )

  const icons = new Array(Math.min(rows * cols, filteredIcons.size))
  let count = 0
  for (let [key, value] of filteredIcons.entries()) {
    const index = Math.floor(count % rows) * cols + Math.floor(count / rows)
    icons[index] = { iconFilePath: value, iconValue: key }
    count++
  }
  iconSelect.refresh(icons)

  // keeps popout from getting clipped outside of sidebar width
  const box = colorMapSelectorDiv.querySelector('.icon-select .box')
  box.style.left = '-87px'
  box.style.top = '100%'
  box.style.width = '333px' // avoids asymmetric whitespace on right side of popout

  return iconSelect
}

export default createColorMapIconSelector

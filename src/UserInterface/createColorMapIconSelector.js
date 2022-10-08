import { IconSelect } from '@thewtex/iconselect.js/lib/control/iconselect'
import { ColorMapIcons } from 'itk-viewer-color-maps'

function createColorMapIconSelector(colorMapSelectorDiv) {
  const rows = 20
  const cols = 4
  const iconSelectParameters = {
    selectedIconWidth: 230,
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
  colorMapSelectorDiv.style.width = '250px'
  const icons = new Array(rows * cols)
  let count = 0
  for (let [key, value] of ColorMapIcons.entries()) {
    const index = Math.floor(count % rows) * cols + Math.floor(count / rows)
    icons[index] = { iconFilePath: value, iconValue: key }
    count++
  }
  iconSelect.refresh(icons)

  return iconSelect
}

export default createColorMapIconSelector

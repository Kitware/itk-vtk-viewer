import { IconSelect } from '@thewtex/iconselect.js/lib/control/iconselect'
import ColorMapPresetIcons from './ColorMapPresetIcons'

function createColorMapIconSelector(colorMapSelectorDiv) {
  const rows = 20
  const cols = 3
  const iconSelectParameters = {
    selectedIconWidth: 170,
    selectedIconHeight: 22,
    selectedBoxPadding: 1,
    iconsWidth: 60,
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
  colorMapSelectorDiv.style.width = '174px'
  const icons = new Array(rows * cols)
  let count = 0
  for (let [key, value] of ColorMapPresetIcons.entries()) {
    const index = Math.floor(count % rows) * cols + Math.floor(count / rows)
    icons[index] = { iconFilePath: value, iconValue: key }
    count++
  }
  iconSelect.refresh(icons)

  // keeps popout from getting clipped outside of sidebar width
  const box = colorMapSelectorDiv.querySelector('.icon-select .box')
  box.style.left = 0
  box.style.top = '100%'

  return iconSelect
}

export default createColorMapIconSelector

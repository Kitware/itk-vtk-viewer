import { IconSelect } from '@thewtex/iconselect.js/lib/control/iconselect'
import { CategoricalColorIcons } from 'itk-viewer-color-maps'

function createCategoricalColorIconSelector(categoricalColorSelectorDiv) {
  const rows = 4
  const cols = 2
  const iconSelectParameters = {
    selectedIconWidth: 140,
    selectedIconHeight: 22,
    selectedBoxPadding: 1,
    iconsWidth: 60,
    iconsHeight: 22,
    boxIconSpace: 1,
    vectoralIconNumber: cols,
    horizontalIconNumber: rows,
  }
  const iconSelect = new IconSelect(
    `${categoricalColorSelectorDiv.id}`,
    categoricalColorSelectorDiv,
    iconSelectParameters
  )
  categoricalColorSelectorDiv.style.width = '154px'
  const icons = new Array(rows * cols)
  let count = 0
  for (let [key, value] of CategoricalColorIcons.entries()) {
    const index = Math.floor(count % rows) * cols + Math.floor(count / rows)
    icons[index] = { iconFilePath: value, iconValue: key }
    count++
  }
  iconSelect.refresh(icons)

  return iconSelect
}

export default createCategoricalColorIconSelector

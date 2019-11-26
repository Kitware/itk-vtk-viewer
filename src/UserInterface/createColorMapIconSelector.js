import { IconSelect } from '@thewtex/iconselect.js/lib/control/iconselect';
import ColorPresetIcons from './ColorPresetIcons';

function createColorMapIconSelector(colorMapSelectorDiv) {
  const rows = 20;
  const cols = 3;
  const iconSelectParameters = {'selectedIconWidth': 230,
      'selectedIconHeight': 22,
      'selectedBoxPadding': 1,
      'iconsWidth': 60,
      'iconsHeight': 22,
      'boxIconSpace': 1,
      'vectoralIconNumber': cols,
      'horizontalIconNumber': rows};
  const iconSelect = new IconSelect(`${colorMapSelectorDiv.id}`,
    colorMapSelectorDiv, iconSelectParameters);
  colorMapSelectorDiv.style.width = '244px';
  const icons = new Array(rows * cols);
  let count = 0;
  for (let [key, value] of ColorPresetIcons.entries()) {
    const index = Math.floor(count % rows)*cols + Math.floor(count / rows);
    icons[index] = {'iconFilePath': value, 'iconValue': key};
    count++;
  }
  iconSelect.refresh(icons)

  return iconSelect;
}

export default createColorMapIconSelector;

import { reaction, action } from 'mobx';

import style from '../ItkVtkViewer.module.css';

function createComponentSelector(
  store,
  imageUIGroup,
) {
  const viewerDOMId = store.id;

  const componentSelector = document.createElement('select');
  componentSelector.setAttribute('class', style.selector);
  componentSelector.id = `${viewerDOMId}-componentSelector`;

  const componentRow = document.createElement('div');
  componentRow.setAttribute('class', style.uiRow);
  componentRow.className += ` ${viewerDOMId}-volumeComponents ${viewerDOMId}-toggle`;

  function updateAvailableComponents() {
    const components = store.imageUI.numberOfComponents;
    if (components > 1) {
      componentRow.style.display = 'flex';
    } else {
      componentRow.style.display = 'none';
    }

    componentSelector.innerHTML = new Array(components).fill(undefined).map((_, ii) => ii)
      .map((component) =>
          `<option value="${component}" >Component ${component}</option>`
      )
      .join('');
    componentSelector.value = 0;
    store.imageUI.selectedComponentIndex = 0;
  }
  reaction(() => { return store.imageUI.image; },
    (image) => { updateAvailableComponents(); }
  )
  updateAvailableComponents();

  const dataArray = store.imageUI.image.getPointData().getScalars();
  const components = dataArray.getNumberOfComponents();
  console.log('components')
  console.log(components)

  componentSelector.addEventListener('change',
    action((event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log(event.target.value)
      store.imageUI.selectedComponentIndex = Number(event.target.value);

      //if (pointSetColorBy[componentSelector.selectedIndex]) {
        //componentSelector.innerHTML = pointSetColorByOptions[componentSelector.selectedIndex]
          //.map(
            //({ label, value }) =>
              //`<option value="${value}" >${label}</option>`
          //)
          //.join('');
        //componentSelector.value = pointSetColorBy[componentSelector.selectedIndex].value;
      //}
      //if (pointSetHasScalars[componentSelector.selectedIndex] && pointSetColorByOptions[componentSelector.selectedIndex].length > 1) {
        //pointSetColorByRow.style.display = 'flex';
      //} else {
        //pointSetColorByRow.style.display = 'none';
      //}
    }));

  reaction(() => { return store.imageUI.selectedComponentIndex; },
    (componentIndex) => {
      componentSelector.value = componentIndex;
    }
  )

  componentRow.appendChild(componentSelector)
  imageUIGroup.appendChild(componentRow)

  return componentSelector
}

export default createComponentSelector;

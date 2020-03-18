import { autorun } from 'mobx';

function applyStyle(el, style) {
  Object.keys(style).forEach((key) => {
    el.style[key] = style[key];
  });
}

function applyContainerStyle(rootContainer, store, viewerStyle) {

  applyStyle(store.container, store.style.containerStyle);
  rootContainer.appendChild(store.container);
  autorun(() => {
    applyStyle(store.container, store.style.containerStyle);
  })
  autorun(() => {
    store.itkVtkView.setBackground(store.style.backgroundColor);
  })

  if (viewerStyle) {
    store.style = viewerStyle;
  }
}

export default applyContainerStyle;

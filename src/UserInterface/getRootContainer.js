function getRootContainer(container) {
  const workContainer = document.querySelector('.content');
  const rootBody = document.querySelector('body');

  return container || workContainer || rootBody;
}

export default getRootContainer;

import Mousetrap from 'mousetrap';

const MOUSETRAP = new Mousetrap();

const addKeyboardShortcuts = (container, viewer, viewerDOMId) => {

  container.addEventListener('mouseenter', () => {
    MOUSETRAP.bind('1', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      viewer.setViewMode('XPlane');
    })
    MOUSETRAP.bind('2', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      viewer.setViewMode('YPlane');
    })
    MOUSETRAP.bind('3', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      viewer.setViewMode('ZPlane');
    })
    MOUSETRAP.bind('4', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      viewer.setViewMode('VolumeRendering');
    })
    MOUSETRAP.bind('r', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      viewer.getViewProxy().resetCamera();
    })
    MOUSETRAP.bind('p', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      viewer.getViewProxy().resetCamera();
    })
    MOUSETRAP.bind('e', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      const resetCroppingPlanesButton = document.getElementById(`${viewerDOMId}-resetCroppingPlanesButton`);
      resetCroppingPlanesButton.click();
    })
    MOUSETRAP.bind('.', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      const resetCroppingPlanesButton = document.getElementById(`${viewerDOMId}-resetCroppingPlanesButton`);
      resetCroppingPlanesButton.click();
    })
    MOUSETRAP.bind('w', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      const toggleCroppingPlanesButton = document.getElementById(`${viewerDOMId}-toggleCroppingPlanesButton`);
      toggleCroppingPlanesButton.click();
    })
    MOUSETRAP.bind(',', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      const toggleCroppingPlanesButton = document.getElementById(`${viewerDOMId}-toggleCroppingPlanesButton`);
      toggleCroppingPlanesButton.click();
    })
    MOUSETRAP.bind("'", function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      const toggleUserInterfaceButton = document.getElementById(`${viewerDOMId}-toggleUserInterfaceButton`);
      toggleUserInterfaceButton.click();
    })
    MOUSETRAP.bind('q', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      const toggleUserInterfaceButton = document.getElementById(`${viewerDOMId}-toggleUserInterfaceButton`);
      toggleUserInterfaceButton.click();
    })
    MOUSETRAP.bind('f', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      const toggleSlicingPlanesButton = document.getElementById(`${viewerDOMId}-toggleSlicingPlanesButton`);
      toggleSlicingPlanesButton.click();
    })
    MOUSETRAP.bind('u', function(event, combo) {
      event.preventDefault();
      event.stopPropagation();
      const toggleSlicingPlanesButton = document.getElementById(`${viewerDOMId}-toggleSlicingPlanesButton`);
      toggleSlicingPlanesButton.click();
    })
  })

  container.addEventListener('mouseleave', () => {
    MOUSETRAP.unbind('1');
    MOUSETRAP.unbind('2');
    MOUSETRAP.unbind('3');
    MOUSETRAP.unbind('4');
    MOUSETRAP.unbind('r');
    MOUSETRAP.unbind('p');
    MOUSETRAP.unbind('e');
    MOUSETRAP.unbind('.');
    MOUSETRAP.unbind('w');
    MOUSETRAP.unbind(',');
    MOUSETRAP.unbind("'");
    MOUSETRAP.unbind('q');
    MOUSETRAP.unbind('f');
    MOUSETRAP.unbind('u');
  })
}

export default addKeyboardShortcuts;

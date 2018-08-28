import Mousetrap from 'mousetrap';
import preventDefaults from './userInterface/preventDefaults';

const MOUSETRAP = new Mousetrap();

const addKeyboardShortcuts = (container, viewer, viewerDOMId) => {

  container.addEventListener('mouseenter', () => {
    MOUSETRAP.bind('1', function(event, combo) {
      preventDefaults(event);
      viewer.setViewMode('XPlane');
    })
    MOUSETRAP.bind('2', function(event, combo) {
      preventDefaults(event);
      viewer.setViewMode('YPlane');
    })
    MOUSETRAP.bind('3', function(event, combo) {
      preventDefaults(event);
      viewer.setViewMode('ZPlane');
    })
    MOUSETRAP.bind('4', function(event, combo) {
      preventDefaults(event);
      viewer.setViewMode('VolumeRendering');
    })
    MOUSETRAP.bind('r', function(event, combo) {
      preventDefaults(event);
      viewer.getViewProxy().resetCamera();
    })
    MOUSETRAP.bind('p', function(event, combo) {
      preventDefaults(event);
      viewer.getViewProxy().resetCamera();
    })
    MOUSETRAP.bind('e', function(event, combo) {
      preventDefaults(event);
      const resetCroppingPlanesButton = document.getElementById(`${viewerDOMId}-resetCroppingPlanesButton`);
      resetCroppingPlanesButton.click();
    })
    MOUSETRAP.bind('.', function(event, combo) {
      preventDefaults(event);
      const resetCroppingPlanesButton = document.getElementById(`${viewerDOMId}-resetCroppingPlanesButton`);
      resetCroppingPlanesButton.click();
    })
    MOUSETRAP.bind('w', function(event, combo) {
      preventDefaults(event);
      const toggleCroppingPlanesButton = document.getElementById(`${viewerDOMId}-toggleCroppingPlanesButton`);
      toggleCroppingPlanesButton.click();
    })
    MOUSETRAP.bind(',', function(event, combo) {
      preventDefaults(event);
      const toggleCroppingPlanesButton = document.getElementById(`${viewerDOMId}-toggleCroppingPlanesButton`);
      toggleCroppingPlanesButton.click();
    })
    MOUSETRAP.bind("'", function(event, combo) {
      preventDefaults(event);
      const toggleUserInterfaceButton = document.getElementById(`${viewerDOMId}-toggleUserInterfaceButton`);
      toggleUserInterfaceButton.click();
    })
    MOUSETRAP.bind('q', function(event, combo) {
      preventDefaults(event);
      const toggleUserInterfaceButton = document.getElementById(`${viewerDOMId}-toggleUserInterfaceButton`);
      toggleUserInterfaceButton.click();
    })
    MOUSETRAP.bind('f', function(event, combo) {
      preventDefaults(event);
      const toggleFullscreenButton = document.getElementById(`${viewerDOMId}-toggleFullscreenButton`);
      toggleFullscreenButton.click();
    })
    MOUSETRAP.bind('u', function(event, combo) {
      preventDefaults(event);
      const toggleFullscreenButton = document.getElementById(`${viewerDOMId}-toggleFullscreenButton`);
      toggleFullscreenButton.click();
    })
    MOUSETRAP.bind('s', function(event, combo) {
      preventDefaults(event);
      const toggleSlicingPlanesButton = document.getElementById(`${viewerDOMId}-toggleSlicingPlanesButton`);
      toggleSlicingPlanesButton.click();
    })
    MOUSETRAP.bind('o', function(event, combo) {
      preventDefaults(event);
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
    MOUSETRAP.unbind('s');
    MOUSETRAP.unbind('o');
  })
}

export default addKeyboardShortcuts;

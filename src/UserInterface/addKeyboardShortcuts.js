import Mousetrap from 'mousetrap'
import preventDefaults from './preventDefaults'

const MOUSETRAP = new Mousetrap()

//const addKeyboardShortcuts = (container, viewer, viewerDOMId) => {
const addKeyboardShortcuts = service => {
  container.addEventListener('mouseenter', () => {
    //MOUSETRAP.bind('1', function(event, combo) {
    //preventDefaults(event)
    //viewer.setViewMode('XPlane')
    //})
    //MOUSETRAP.bind('alt+1', function(event, combo) {
    //preventDefaults(event)
    //viewer.setViewMode('XPlane')
    //})
    //MOUSETRAP.bind('2', function(event, combo) {
    //preventDefaults(event)
    //viewer.setViewMode('YPlane')
    //})
    //MOUSETRAP.bind('alt+2', function(event, combo) {
    //preventDefaults(event)
    //viewer.setViewMode('YPlane')
    //})
    //MOUSETRAP.bind('3', function(event, combo) {
    //preventDefaults(event)
    //viewer.setViewMode('ZPlane')
    //})
    //MOUSETRAP.bind('alt+3', function(event, combo) {
    //preventDefaults(event)
    //viewer.setViewMode('ZPlane')
    //})
    //MOUSETRAP.bind('4', function(event, combo) {
    //preventDefaults(event)
    //viewer.setViewMode('VolumeRendering')
    //})
    //MOUSETRAP.bind('alt+4', function(event, combo) {
    //preventDefaults(event)
    //viewer.setViewMode('VolumeRendering')
    //})
    //MOUSETRAP.bind('r', function(event, combo) {
    //preventDefaults(event)
    //viewer.getViewProxy().resetCamera()
    //})
    //MOUSETRAP.bind('alt+r', function(event, combo) {
    //preventDefaults(event)
    //viewer.getViewProxy().resetCamera()
    //})
    //MOUSETRAP.bind('p', function(event, combo) {
    //preventDefaults(event)
    //viewer.getViewProxy().resetCamera()
    //})
    //MOUSETRAP.bind('alt+p', function(event, combo) {
    //preventDefaults(event)
    //viewer.getViewProxy().resetCamera()
    //})
    //MOUSETRAP.bind('e', function(event, combo) {
    //preventDefaults(event)
    //const resetCroppingPlanesButton = document.getElementById(
    //`${viewerDOMId}-resetCroppingPlanesButton`
    //)
    //resetCroppingPlanesButton.click()
    //})
    //MOUSETRAP.bind('alt+e', function(event, combo) {
    //preventDefaults(event)
    //const resetCroppingPlanesButton = document.getElementById(
    //`${viewerDOMId}-resetCroppingPlanesButton`
    //)
    //resetCroppingPlanesButton.click()
    //})
    //MOUSETRAP.bind('.', function(event, combo) {
    //preventDefaults(event)
    //const resetCroppingPlanesButton = document.getElementById(
    //`${viewerDOMId}-resetCroppingPlanesButton`
    //)
    //resetCroppingPlanesButton.click()
    //})
    //MOUSETRAP.bind('alt+.', function(event, combo) {
    //preventDefaults(event)
    //const resetCroppingPlanesButton = document.getElementById(
    //`${viewerDOMId}-resetCroppingPlanesButton`
    //)
    //resetCroppingPlanesButton.click()
    //})
    //MOUSETRAP.bind('w', function(event, combo) {
    //preventDefaults(event)
    //const toggleCroppingPlanesButton = document.getElementById(
    //`${viewerDOMId}-toggleCroppingPlanesButton`
    //)
    //toggleCroppingPlanesButton.click()
    //})
    //MOUSETRAP.bind('alt+w', function(event, combo) {
    //preventDefaults(event)
    //const toggleCroppingPlanesButton = document.getElementById(
    //`${viewerDOMId}-toggleCroppingPlanesButton`
    //)
    //toggleCroppingPlanesButton.click()
    //})
    //MOUSETRAP.bind(',', function(event, combo) {
    //preventDefaults(event)
    //const toggleCroppingPlanesButton = document.getElementById(
    //`${viewerDOMId}-toggleCroppingPlanesButton`
    //)
    //toggleCroppingPlanesButton.click()
    //})
    //MOUSETRAP.bind('alt+,', function(event, combo) {
    //preventDefaults(event)
    //const toggleCroppingPlanesButton = document.getElementById(
    //`${viewerDOMId}-toggleCroppingPlanesButton`
    //)
    //toggleCroppingPlanesButton.click()
    //})
    //MOUSETRAP.bind("'", function(event, combo) {
    //preventDefaults(event)
    //const toggleUserInterfaceButton = document.getElementById(
    //`${viewerDOMId}-toggleUserInterfaceButton`
    //)
    //toggleUserInterfaceButton.click()
    //})
    //MOUSETRAP.bind("alt+'", function(event, combo) {
    //preventDefaults(event)
    //const toggleUserInterfaceButton = document.getElementById(
    //`${viewerDOMId}-toggleUserInterfaceButton`
    //)
    //toggleUserInterfaceButton.click()
    //})
    MOUSETRAP.bind('q', function(event, combo) {
      preventDefaults(event)
      service.send('TOGGLE_UI_COLLAPSED')
    })
    MOUSETRAP.bind('alt+q', function(event, combo) {
      preventDefaults(event)
      service.send('TOGGLE_UI_COLLAPSED')
    })
    MOUSETRAP.bind('f', function(event, combo) {
      preventDefaults(event)
      service.send('TOGGLE_FULLSCREEN')
    })
    MOUSETRAP.bind('alt+f', function(event, combo) {
      preventDefaults(event)
      service.send('TOGGLE_FULLSCREEN')
    })
    //MOUSETRAP.bind('u', function(event, combo) {
    //preventDefaults(event)
    //const toggleFullscreenButton = document.getElementById(
    //`${viewerDOMId}-toggleFullscreenButton`
    //)
    //toggleFullscreenButton.click()
    //})
    //MOUSETRAP.bind('alt+u', function(event, combo) {
    //preventDefaults(event)
    //const toggleFullscreenButton = document.getElementById(
    //`${viewerDOMId}-toggleFullscreenButton`
    //)
    //toggleFullscreenButton.click()
    //})
    //MOUSETRAP.bind('s', function(event, combo) {
    //preventDefaults(event)
    //const toggleSlicingPlanesButton = document.getElementById(
    //`${viewerDOMId}-toggleSlicingPlanesButton`
    //)
    //toggleSlicingPlanesButton.click()
    //})
    //MOUSETRAP.bind('alt+s', function(event, combo) {
    //preventDefaults(event)
    //const toggleSlicingPlanesButton = document.getElementById(
    //`${viewerDOMId}-toggleSlicingPlanesButton`
    //)
    //toggleSlicingPlanesButton.click()
    //})
    //MOUSETRAP.bind('o', function(event, combo) {
    //preventDefaults(event)
    //const toggleSlicingPlanesButton = document.getElementById(
    //`${viewerDOMId}-toggleSlicingPlanesButton`
    //)
    //toggleSlicingPlanesButton.click()
    //})
    //MOUSETRAP.bind('alt+o', function(event, combo) {
    //preventDefaults(event)
    //const toggleSlicingPlanesButton = document.getElementById(
    //`${viewerDOMId}-toggleSlicingPlanesButton`
    //)
    //toggleSlicingPlanesButton.click()
    //})
    MOUSETRAP.bind('p', function(event, combo) {
      preventDefaults(event)
      service.send('TOGGLE_ROTATE')
    })
    MOUSETRAP.bind('alt+p', function(event, combo) {
      preventDefaults(event)
      service.send('TOGGLE_ROTATE')
    })
  })

  container.addEventListener('mouseleave', () => {
    MOUSETRAP.unbind('1')
    MOUSETRAP.unbind('alt+1')
    MOUSETRAP.unbind('2')
    MOUSETRAP.unbind('alt+2')
    MOUSETRAP.unbind('3')
    MOUSETRAP.unbind('alt+3')
    MOUSETRAP.unbind('4')
    MOUSETRAP.unbind('alt+4')
    MOUSETRAP.unbind('r')
    MOUSETRAP.unbind('alt+r')
    MOUSETRAP.unbind('p')
    MOUSETRAP.unbind('alt+p')
    MOUSETRAP.unbind('e')
    MOUSETRAP.unbind('alt+e')
    MOUSETRAP.unbind('.')
    MOUSETRAP.unbind('alt+.')
    MOUSETRAP.unbind('w')
    MOUSETRAP.unbind('alt+w')
    MOUSETRAP.unbind(',')
    MOUSETRAP.unbind('alt+,')
    MOUSETRAP.unbind("'")
    MOUSETRAP.unbind("alt+'")
    MOUSETRAP.unbind('q')
    MOUSETRAP.unbind('alt+q')
    MOUSETRAP.unbind('f')
    MOUSETRAP.unbind('alt+f')
    MOUSETRAP.unbind('u')
    MOUSETRAP.unbind('alt+u')
    MOUSETRAP.unbind('s')
    MOUSETRAP.unbind('alt+s')
    MOUSETRAP.unbind('o')
    MOUSETRAP.unbind('alt+o')
    MOUSETRAP.unbind('p')
    MOUSETRAP.unbind('alt+p')
  })
}

export default addKeyboardShortcuts

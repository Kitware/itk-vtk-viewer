const fullscreenMethods = []
window.addEventListener('load', () => {
  const body = document.querySelector('body')
  // https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
  ;[
    ['requestFullscreen', 'exitFullscreen', 'fullscreenchange', 'fullscreen'],
    [
      'mozRequestFullScreen',
      'mozCancelFullScreen',
      'mozfullscreenchange',
      'mozFullScreen',
    ],
    [
      'msRequestFullscreen',
      'msExitFullscreen',
      'MSFullscreenChange',
      'msFullscreenEnabled',
    ],
    [
      'webkitRequestFullscreen',
      'webkitExitFullscreen',
      'webkitfullscreenchange',
      'webkitIsFullScreen',
    ],
  ].forEach(methods => {
    if (body[methods[0]] && fullscreenMethods.length === 0) {
      fullscreenMethods.splice(methods, methods.length, ...methods)
    }
  })
})

export default fullscreenMethods

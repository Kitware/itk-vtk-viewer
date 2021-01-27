const body = document.querySelector('body')
let fullscreenMethods = null
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
  if (body[methods[0]] && !fullscreenMethods) {
    fullscreenMethods = methods
  }
})

export default fullscreenMethods

import createMainInterface from './createMainInterface'
import toggleFullscreen from './toggleFullscreen'
import toggleRotate from './toggleRotate'
import toggleAnnotations from './toggleAnnotations'
import toggleAxes from './toggleAxes'
import toggleInterpolation from './toggleInterpolation'
import toggleBackgroundColor from './toggleBackgroundColor'

const mainUIMachineOptions = {
  actions: {
    createMainInterface,

    toggleAnnotations,

    toggleFullscreen,

    toggleRotate,

    toggleAxes,

    toggleInterpolation,

    toggleBackgroundColor,
  },
}

export default mainUIMachineOptions

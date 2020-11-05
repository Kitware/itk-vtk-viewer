import createMainInterface from './createMainInterface'
import toggleFullscreen from './toggleFullscreen'
import toggleRotate from './toggleRotate'
import toggleAnnotations from './toggleAnnotations'
import toggleAxes from './toggleAxes'
import toggleInterpolation from './toggleInterpolation'

const mainUIMachineOptions = {
  actions: {
    createMainInterface,

    toggleAnnotations,

    toggleFullscreen,

    toggleRotate,

    toggleAxes,

    toggleInterpolation,
  },
}

export default mainUIMachineOptions

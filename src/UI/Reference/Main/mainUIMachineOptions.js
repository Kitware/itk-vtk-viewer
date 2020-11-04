import createMainInterface from './createMainInterface'
import toggleAnnotations from './toggleAnnotations'
import toggleFullscreen from './toggleFullscreen'
import toggleRotate from './toggleRotate'

const mainUIMachineOptions = {
  actions: {
    createMainInterface,

    toggleAnnotations,

    toggleFullscreen,

    toggleRotate,
  },
}

export default mainUIMachineOptions

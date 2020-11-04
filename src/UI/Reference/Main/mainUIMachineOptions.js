import createMainInterface from './createMainInterface'
import toggleAnnotations from './toggleAnnotations'
import toggleFullscreen from './toggleFullscreen'

const mainUIMachineOptions = {
  actions: {
    createMainInterface,

    toggleAnnotations,

    toggleFullscreen,
  },
}

export default mainUIMachineOptions

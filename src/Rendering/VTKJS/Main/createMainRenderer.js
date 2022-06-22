// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import 'vtk.js/Sources/Rendering/Profiles/Geometry'
import 'vtk.js/Sources/Rendering/Profiles/Glyph'
import 'vtk.js/Sources/Rendering/Profiles/Volume'

import { createCropping } from './croppingPlanes'

function createMainRenderer(context) {
  createCropping(context)
}

export default createMainRenderer

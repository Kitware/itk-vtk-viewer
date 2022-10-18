// import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager'
// import proxyConfiguration from './proxyManagerConfiguration'
import createMainRenderer from './Main/createMainRenderer'

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import 'vtk.js/Sources/Rendering/Profiles/Geometry'
import 'vtk.js/Sources/Rendering/Profiles/Glyph'
import 'vtk.js/Sources/Rendering/Profiles/Volume'

function createRenderer(context) {
  //const proxyManager = vtkProxyManager.newInstance({ proxyConfiguration })
  //context.proxyManager = proxyManager
  //window.addEventListener('resize', proxyManager.resizeAllViews)

  //context.itkVtkView = proxyManager.createProxy('Views', 'ItkVtkView')
  //context.renderWindow = context.itkVtkView.getRenderWindow()

  context.itkVtkView.setContainer(context.renderingViewContainers.get('volume'))
  context.itkVtkView.setXyLowerLeft(context.xyLowerLeft)

  createMainRenderer(context)

  const interactor = context.itkVtkView.getInteractor()
  interactor.onRenderEvent(() => context.service.send('POST_RENDER'))
}

export default createRenderer

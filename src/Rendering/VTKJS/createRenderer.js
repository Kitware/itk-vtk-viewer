import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager'
import proxyConfiguration from './proxyManagerConfiguration'

function createRenderer(context) {
  //const proxyManager = vtkProxyManager.newInstance({ proxyConfiguration })
  //context.proxyManager = proxyManager
  //window.addEventListener('resize', proxyManager.resizeAllViews)

  //context.itkVtkView = proxyManager.createProxy('Views', 'ItkVtkView')
  //context.renderWindow = context.itkVtkView.getRenderWindow()

  context.itkVtkView.setContainer(context.container)
}

export default createRenderer

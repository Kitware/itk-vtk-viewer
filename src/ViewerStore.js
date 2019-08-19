import { observable, computed } from 'mobx';

const STYLE_CONTAINER = {
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: '200px',
  minWidth: '450px',
  margin: '0',
  padding: '0',
  top: '0',
  left: '0',
  overflow: 'hidden',
};

class ViewerStore {
    container = null;
    id = 'itk-vtk-viewer';
    proxyManager = null;
    itkVtkView = null;
    get renderWindow() {
      return this.itkVtkView.getRenderWindow();
    }

    @observable style = {
      backgroundColor: [0, 0, 0],
      containerStyle: STYLE_CONTAINER,
    };

    mainUI = {
      uiContainer: null,
      @observable collapsed: false,
      @observable annotationsEnabled: true,
      @observable fullscreenEnabled: false,
      @observable rotateEnabled: false,
      @observable interpolationEnabled: true,
    }

    imageUI = {
      source: null,
      @observable.ref representationProxy: null,

      lookupTableProxy: null,
      piecewiseFunctionProxy: null,
      transferFunctionWidget: null,
      updateColorMap: null,
      updateGradientOpacity: null,

      croppingWidget: null,
      addCroppingPlanesChangedHandler: () => {},
      addResetCropHandler: () => {},
    }
    @observable.ref image = null;

    geometriesUI = {
      initialized: false,
      sources: [],
      representationProxies: [],
    }
    @observable.shallow geometries = [];

    pointSetsUI = {
      initialized: false,
      sources: [],
      representationProxies: [],
    }
    @observable.shallow pointSets = [];

    constructor(proxyManager) {
      this.id = 'itk-vtk-viewer-' +
        performance
          .now()
          .toString()
          .replace('.', '');
      this.proxyManager = proxyManager;
      this.itkVtkView = proxyManager.createProxy('Views', 'ItkVtkView');
      this.container = document.createElement('div');
      this.itkVtkView.setContainer(this.container);

      this.itkVtkView.setBackground(this.style.backgroundColor);

      this.imageUI.source = proxyManager.createProxy('Sources', 'TrivialProducer', { name: 'Image', });
    }

    @computed get isBackgroundDark() {
      const backgroundColor = this.style.backgroundColor;
      return backgroundColor[0] +
          backgroundColor[1] +
          backgroundColor[2] <
        1.5;
    }
}

export default ViewerStore;

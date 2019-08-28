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
      @observable croppingPlanesEnabled: false,

      @observable viewMode: 'VolumeRendering',
      xPlaneButton: null,
      yPlaneButton: null,
      zPlaneButton: null,
      volumeRenderingButton: null,
    }

    imageUI = {
      source: null,
      @observable.ref representationProxy: null,

      lookupTableProxy: null,
      piecewiseFunctionProxy: null,
      transferFunctionWidget: null,

      croppingWidget: null,
      addCroppingPlanesChangedHandler: () => {},
      addResetCropHandler: () => {},

      @observable colorMap: 'Grayscale',
      @observable useShadow: true,
      @observable slicingPlanesEnabled: false,
      @observable gradientOpacity: 0.2,
    }
    @observable.ref image = null;

    geometriesUI = {
      initialized: false,
      sources: [],
      representationProxies: [],
      @observable selectedGeometryIndex: 0,
      @observable geometryNames: [],
      @observable geometryRepresentations: [],
      @observable geometryColorBy: [],
      @observable geometryColors: [],
      @observable geometryOpacities: [],
      @observable geometryColorPresets: [],
      @computed get geometryHasScalars() {
        return this.geometries.map((geometry) => {
          const pointData = geometry.getPointData();
          const hasPointDataScalars = !!pointData.getScalars();
          const cellData = geometry.getCellData();
          const hasCellDataScalars = !!cellData.getScalars();
          return hasPointDataScalars || hasCellDataScalars;
          })
        },
      @computed get geometryColorByOptions() {
        return this.geometries.map((geometry, index) => {
          if(!this.geometriesUI.geometryHasScalars[index]) {
            return null
          }
          const options = [].concat(
            geometry
              .getPointData()
              .getArrays()
              .map((a) => ({
                label: `(p) ${a.getName()}`,
                value: `pointData:${a.getName()}`,
              })),
            geometry
              .getCellData()
              .getArrays()
              .map((a) => ({
                label: `(c) ${a.getName()}`,
                value: `cellData:${a.getName()}`,
              }))
            )
          return options;
        })
      },
      @computed get geometryColorByDefault() {
        return this.geometries.map((geometry, index) => {
          if(!geometryHasScalars[index]) {
            return null
          }
          const pointData = geometry.getPointData();
          if (!!pointData.getScalars()) {
            const activeIndex = pointData.getActiveScalars();
            const activeArray = pointData.getArrays()[activeIndex];
            return { label: `(p) ${activeArray.getName()}`, value: `pointData:${activeArray.getName()}` };
          }
          const cellData = geometry.getCellData();
          if (!!cellData.getScalars()) {
            const activeIndex = cellData.getActiveScalars();
            const activeArray = cellData.getArrays()[activeIndex];
            return { label: `(c) ${activeArray.getName()}`, value: `cellData:${activeArray.getName()}` };
          }
          throw new Error('Should not reach here.')
          })
        },
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

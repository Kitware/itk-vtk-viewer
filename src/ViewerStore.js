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

class MainUIStore {
  uiContainer = null;
  @observable collapsed = false;
  @observable annotationsEnabled = true;
  @observable fullscreenEnabled = false;
  @observable rotateEnabled = false;
  @observable interpolationEnabled = true;
  @observable croppingPlanesEnabled = false;

  @observable viewMode = 'VolumeRendering';
  xPlaneButton = null;
  yPlaneButton = null;
  zPlaneButton = null;
  volumeRenderingButton = null;
}

class ImageUIStore {
  @observable.ref image = null;

  source = null;
  @observable.ref representationProxy = null;

  @observable selectedComponentIndex = 0;
  @computed get numberOfComponents() {
    const dataArray = this.image.getPointData().getScalars();
    return dataArray.getNumberOfComponents();
  }

  lookupTableProxies = null;
  piecewiseFunctionProxies = null;
  transferFunctionWidget = null;

  croppingWidget = null;
  addCroppingPlanesChangedHandler = () => {};
  addResetCropHandler = () => {};

  @observable colorMaps = null
  @observable colorRanges = [];

  @observable blendMode = 0;
  @observable useShadow = true;
  @observable slicingPlanesEnabled = false;
  @observable gradientOpacity = 0.2;
}

class GeometriesUIStore {
  @observable.shallow geometries = [];

  initialized = false;
  sources = [];
  representationProxies = [];

  @observable selectedGeometryIndex = 0;
  @observable names = [];
  @observable representations = [];
  @observable colorMaps = [];
  @observable colorBy = [];
  @observable colors = [];
  @observable opacities = [];
  @observable colorRanges = new Map();
  colorRangesReactions = new Map();
  @computed get hasScalars() {
    return this.geometries.map((geometry) => {
      const pointData = geometry.getPointData();
      const hasPointDataScalars = !!pointData.getScalars();
      const cellData = geometry.getCellData();
      const hasCellDataScalars = !!cellData.getScalars();
      return hasPointDataScalars || hasCellDataScalars;
      })
    };
  @computed get colorByOptions() {
    return this.geometries.map((geometry, index) => {
      if(!this.hasScalars[index]) {
        return null
      }
      const options = [].concat(
        geometry
          .getPointData()
          .getArrays()
          .map((a) => ({
            label: `Points: ${a.getName()}`,
            value: `pointData:${a.getName()}`,
          })),
        geometry
          .getCellData()
          .getArrays()
          .map((a) => ({
            label: `Cells: ${a.getName()}`,
            value: `cellData:${a.getName()}`,
          }))
        )
      return options;
    })
  };
  @computed get colorByDefault() {
    return this.geometries.map((geometry, index) => {
      if(!this.hasScalars[index]) {
        return null
      }
      const pointData = geometry.getPointData();
      if (!!pointData.getScalars()) {
        const activeIndex = pointData.getActiveScalars();
        const activeArray = pointData.getArrays()[activeIndex];
        return observable({ label: `Points: ${activeArray.getName()}`, value: `pointData:${activeArray.getName()}` });
      }
      const cellData = geometry.getCellData();
      if (!!cellData.getScalars()) {
        const activeIndex = cellData.getActiveScalars();
        const activeArray = cellData.getArrays()[activeIndex];
        return observable({ label: `Cells: ${activeArray.getName()}`, value: `cellData:${activeArray.getName()}` });
      }
      throw new Error('Should not reach here.')
      })
    };
  @computed get selectedColorRange() {
    const geometryIndex = this.selectedGeometryIndex;
    if (!this.hasScalars[geometryIndex]) {
      return null;
    }
    const colorByKey = this.colorBy[geometryIndex].value;
    return this.colorRanges.get(geometryIndex).get(colorByKey);
    };
  @computed get selectedLookupTableProxy() {
    const geometryIndex = this.selectedGeometryIndex;
    if (!this.hasScalars[geometryIndex]) {
      return null;
    }
    const proxy = this.representationProxies[geometryIndex];
    const [colorByArrayName, location] = proxy.getColorBy();
    return proxy.getLookupTableProxy(colorByArrayName, location);
    };
}

class PointSetsUIStore {
  @observable.shallow pointSets = [];

  initialized = false;
  sources = [];
  representationProxies = [];

  @observable selectedPointSetIndex = 0;
  @observable names = [];
  @observable representations = [];
  @observable colorBy = [];
  @observable colors = [];
  @observable opacities = [];
  @observable colorPresets = [];
  @observable sizes = [];
  @observable colorRanges = [];
  @computed get hasScalars() {
    return this.pointSets.map((pointSet) => {
      const pointData = pointSet.getPointData();
      const hasPointDataScalars = !!pointData.getScalars();
      return hasPointDataScalars;
      })
    };
  @computed get colorByOptions() {
    return this.pointSets.map((pointSet, index) => {
      if(!this.hasScalars[index]) {
        return null
      }
      const options = [].concat(
        pointSet
          .getPointData()
          .getArrays()
          .map((a) => ({
            label: `${a.getName()}`,
            value: `pointData:${a.getName()}`,
          })),
        )
      return options;
    })
  };
  @computed get colorByDefault() {
    return this.pointSets.map((pointSet, index) => {
      if(!this.hasScalars[index]) {
        return null
      }
      const pointData = pointSet.getPointData();
      if (!!pointData.getScalars()) {
        const activeIndex = pointData.getActiveScalars();
        const activeArray = pointData.getArrays()[activeIndex];
        return { label: `${activeArray.getName()}`, value: `pointData:${activeArray.getName()}` };
      }
      throw new Error('Should not reach here.')
      })
    };
}

class ViewerStore {
  constructor(proxyManager) {
    this.mainUI = new MainUIStore();
    this.imageUI = new ImageUIStore();
    this.geometriesUI = new GeometriesUIStore();
    this.pointSetsUI = new PointSetsUIStore();

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

  container = null;
  id = 'itk-vtk-viewer';
  proxyManager = null;
  itkVtkView = null;
  get renderWindow() {
    return this.itkVtkView.getRenderWindow();
  }

  @computed get isBackgroundDark() {
    const backgroundColor = this.style.backgroundColor;
    return backgroundColor[0] +
        backgroundColor[1] +
        backgroundColor[2] <
      1.5;
  }

  @observable style = {
    backgroundColor: [0, 0, 0],
    containerStyle: STYLE_CONTAINER,
  };

  mainUI = null;
  imageUI = null;
  geometriesUI = null;
  pointSetsUI = null;
}

export default ViewerStore;

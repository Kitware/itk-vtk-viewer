import vtkFullScreenRenderWindow  from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';

import vtkPiecewiseFunction       from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction';
import vtkVolume                  from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkVolumeMapper            from 'vtk.js/Sources/Rendering/Core/VolumeMapper';
import vtkColorTransferFunction   from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';

import helper from './helper';

let pipeline = null;

const VIEWER_MAPPING = {
  volumeRenderering(data, renderer, renderWindow) {
    const internalPipeline = { renderer, renderWindow };
    const dataArray = data.image.getPointData().getScalars();
    if (!dataArray) {
      window.alert('No data array available in dataset');
      return internalPipeline;
    }
    const dataRange = dataArray.getRange();

    const actor = vtkVolume.newInstance();
    const mapper = vtkVolumeMapper.newInstance();
    mapper.setSampleDistance(0.7);
    actor.setMapper(mapper);

    // create color and opacity transfer functions
    const ctfun = vtkColorTransferFunction.newInstance();
    ctfun.addRGBPoint(dataRange[0], 0.4, 0.2, 0.0);
    ctfun.addRGBPoint(dataRange[1], 1.0, 1.0, 1.0);

    const ofun = vtkPiecewiseFunction.newInstance();
    ofun.addPoint(dataRange[0], 0.0);
    ofun.addPoint((dataRange[0] + dataRange[1]) * 0.5, 0.5);
    ofun.addPoint(dataRange[1], 0.8);

    actor.getProperty().setRGBTransferFunction(0, ctfun);
    actor.getProperty().setScalarOpacity(0, ofun);
    actor.getProperty().setScalarOpacityUnitDistance(0, 4.5);
    actor.getProperty().setInterpolationTypeToLinear();
    actor.getProperty().setUseGradientOpacity(0, true);
    actor.getProperty().setGradientOpacityMinimumValue(0, 15);
    actor.getProperty().setGradientOpacityMinimumOpacity(0, 0.0);
    actor.getProperty().setGradientOpacityMaximumValue(0, 100);
    actor.getProperty().setGradientOpacityMaximumOpacity(0, 1.0);
    actor.getProperty().setShade(true);
    actor.getProperty().setAmbient(0.2);
    actor.getProperty().setDiffuse(0.7);
    actor.getProperty().setSpecular(0.3);
    actor.getProperty().setSpecularPower(8.0);

    mapper.setInputData(data.image);

    renderer.addVolume(actor);
    renderer.resetCamera();
    renderer.updateLightsGeometryToFollowCamera();
    renderWindow.render();

    Object.assign(internalPipeline, { actor, mapper, ofun, ctfun });

    return internalPipeline;
  },
};

function createViewer(container, data) {
  helper.emptyContainer(container);
  const config = { rootContainer: container, background: [0, 0, 0] };
  if (container) {
    config.containerStyle = {
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '200px',
      minWidth: '200px',
      overflow: 'hidden',
    };
    // config.controlPanelStyle = {};
    config.listenWindowResize = true;
  }

  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance(config);
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();

  const pipelineBuilder = VIEWER_MAPPING[data.type];
  if (pipelineBuilder) {
    pipeline = pipelineBuilder(data, renderer, renderWindow);
  } else {
    window.alert(`No viewer found for ${data.type}`);
  }
  return pipeline;
}

function getPipeline() {
  return pipeline;
}

export default {
  createViewer,
  getPipeline,
};

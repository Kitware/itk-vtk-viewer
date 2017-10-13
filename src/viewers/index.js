import vtkFullScreenRenderWindow  from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkColorTransferFunction   from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction       from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction';

import helper from '../helper';

import imageRendering from './imageRendering';
import volumeRendering from './volumeRendering';

const viewers = { imageRendering, volumeRendering };

let pipeline = null;

function getPipeline() {
  return pipeline;
}

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
    config.listenWindowResize = true;
  }

  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance(config);
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();
  renderWindow.getInteractor().setDesiredUpdateRate(15);

  const dataArray = data.image.getPointData().getScalars();
  if (!dataArray) {
    window.alert('No data array available in dataset');
  }

  const lookupTable = vtkColorTransferFunction.newInstance();
  const piecewiseFunction = vtkPiecewiseFunction.newInstance();

  const pipelineBuilder = viewers[data.type];
  if (pipelineBuilder) {
    pipeline = pipelineBuilder(data, renderer, renderWindow, piecewiseFunction, lookupTable);

    if (data.type.toString() === 'volumeRendering') {
      helper.createVolumeToggleUI(container, lookupTable, piecewiseFunction, pipeline.actor, dataArray, renderWindow);
    }
  } else {
    window.alert(`No viewer found for ${data.type}`);
  }
  renderWindow.render();
  return pipeline;
}

export default {
  createViewer,
  getPipeline,
};

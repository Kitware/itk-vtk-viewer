import vtkFullScreenRenderWindow  from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';

import vtkColorTransferFunction   from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';
import vtkColorMaps               from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps.json';
import vtkImageMapper             from 'vtk.js/Sources/Rendering/Core/ImageMapper';
import vtkImageSlice              from 'vtk.js/Sources/Rendering/Core/ImageSlice';
import vtkInteractorStyleImage    from 'vtk.js/Sources/Interaction/Style/InteractorStyleImage';
import vtkPiecewiseFunction       from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction';
import vtkPiecewiseGaussianWidget from 'vtk.js/Sources/Interaction/Widgets/PiecewiseGaussianWidget';
import vtkVolume                  from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkVolumeMapper            from 'vtk.js/Sources/Rendering/Core/VolumeMapper';
import macro                      from 'vtk.js/Sources/macro';

import toggleIcon from './toggleIcon.png';
import appStyle   from './ItkVtkImageViewer.mcss';
import helper     from './helper';

let pipeline = null;

const presetNames = vtkColorMaps.filter(p => p.RGBPoints).map(p => p.Name);
const presetSelector = document.createElement('select');
presetSelector.setAttribute('class', appStyle.selector);
presetSelector.innerHTML = presetNames.map(name => `<option value="${name}">${name}</option>`).join('');

function getPreset(name) {
  return vtkColorMaps.find(p => p.Name === name);
}

const VIEWER_MAPPING = {
  volumeRendering(data, renderer, renderWindow, piecewiseFunction, lookupTable) {
    const internalPipeline = { renderer, renderWindow };

    const actor = vtkVolume.newInstance();
    const mapper = vtkVolumeMapper.newInstance();
    let sampleDistance = 0.7;
    sampleDistance = Math.min(...data.image.getSpacing());
    mapper.setInputData(data.image);
    mapper.setSampleDistance(sampleDistance);
    actor.setMapper(mapper);

    actor.getProperty().setRGBTransferFunction(0, lookupTable);
    actor.getProperty().setScalarOpacity(0, piecewiseFunction);
    actor.getProperty().setInterpolationTypeToFastLinear();
    // actor.getProperty().setInterpolationTypeToLinear();

    // actor.getProperty().setScalarOpacityUnitDistance(0, 4.5);
    // actor.getProperty().setUseGradientOpacity(0, true);
    // actor.getProperty().setGradientOpacityMinimumValue(0, 15);
    // actor.getProperty().setGradientOpacityMinimumOpacity(0, 0.0);
    // actor.getProperty().setGradientOpacityMaximumValue(0, 100);
    // actor.getProperty().setGradientOpacityMaximumOpacity(0, 1.0);
    // actor.getProperty().setShade(true);
    // actor.getProperty().setAmbient(0.2);
    // actor.getProperty().setDiffuse(0.7);
    // actor.getProperty().setSpecular(0.3);
    // actor.getProperty().setSpecularPower(8.0);

    mapper.setInputData(data.image);

    renderer.addVolume(actor);
    renderer.resetCamera();
    renderer.getActiveCamera().elevation(20);
    renderer.getActiveCamera().azimuth(30);
    renderer.updateLightsGeometryToFollowCamera();
    renderWindow.getInteractor().setDesiredUpdateRate(15);
    renderWindow.render();

    Object.assign(internalPipeline, { actor, mapper });

    return internalPipeline;
  },
  imageRendering(data, renderer, renderWindow, piecewiseFunction, lookupTable) {
    const internalPipeline = { renderer, renderWindow };

    const mapper = vtkImageMapper.newInstance();
    mapper.setInputData(data.image);
    mapper.setSliceAtFocalPoint(true);

    const actor = vtkImageSlice.newInstance();
    const dataArray = data.image.getPointData().getScalars();
    const dataRange = dataArray.getRange();
    const window = dataRange[1] - dataRange[0];
    actor.getProperty().setColorWindow(window);
    actor.getProperty().setColorLevel(dataRange[0] + (window / 2.0));
    actor.setMapper(mapper);
    const iStyle = vtkInteractorStyleImage.newInstance();
    iStyle.setInteractionMode('IMAGE_SLICING');
    renderWindow.getInteractor().setInteractorStyle(iStyle);
    renderer.addActor(actor);
    renderer.resetCamera();
    renderWindow.render();

    renderer.addVolume(actor);
    renderer.resetCamera();
    renderer.updateLightsGeometryToFollowCamera();
    renderWindow.render();

    Object.assign(internalPipeline, { actor, mapper });

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

  const dataArray = data.image.getPointData().getScalars();
  if (!dataArray) {
    window.alert('No data array available in dataset');
  }
  const dataRange = dataArray.getRange();

  const lookupTable = vtkColorTransferFunction.newInstance();

  function applyPreset() {
    const preset = getPreset(presetSelector.value);
    lookupTable.applyColorMap(preset);
    lookupTable.setMappingRange(...dataRange);
    lookupTable.updateRange();
  }
  applyPreset();
  presetSelector.addEventListener('change', applyPreset);

  const transferFunctionWidget = vtkPiecewiseGaussianWidget.newInstance({ numberOfBins: 256, size: [400, 150] });
  transferFunctionWidget.updateStyle({
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    histogramColor: 'rgba(100, 100, 100, 0.5)',
    strokeColor: 'rgb(0, 0, 0)',
    activeColor: 'rgb(255, 255, 255)',
    handleColor: 'rgb(50, 150, 50)',
    buttonDisableFillColor: 'rgba(255, 255, 255, 0.5)',
    buttonDisableStrokeColor: 'rgba(0, 0, 0, 0.5)',
    buttonStrokeColor: 'rgba(0, 0, 0, 1)',
    buttonFillColor: 'rgba(255, 255, 255, 1)',
    strokeWidth: 2,
    activeStrokeWidth: 3,
    buttonStrokeWidth: 1.5,
    handleWidth: 3,
    iconSize: 20, // Can be 0 if you want to remove buttons (dblClick for (+) / rightClick for (-))
    padding: 10,
  });
  transferFunctionWidget.setDataArray(dataArray.getData());
  const piecewiseFunction = vtkPiecewiseFunction.newInstance();
  transferFunctionWidget.setColorTransferFunction(lookupTable);
  transferFunctionWidget.addGaussian(0.5, 0.30, 0.5, 0.5, 0.4);
  transferFunctionWidget.applyOpacity(piecewiseFunction);

  const widgetContainer = document.createElement('div');
  widgetContainer.setAttribute('class', appStyle.piecewiseWidget);

  function toggleWidgetVisibility() {
    if (widgetContainer.style.display === 'none') {
      widgetContainer.style.display = 'block';
      presetSelector.style.display = 'block';
    } else {
      widgetContainer.style.display = 'none';
      presetSelector.style.display = 'none';
    }
  }

  const toggleButton = new Image();
  toggleButton.src = toggleIcon;
  toggleButton.setAttribute('class', appStyle.toggleButton);
  toggleButton.addEventListener('click', toggleWidgetVisibility);

  transferFunctionWidget.setContainer(widgetContainer);
  transferFunctionWidget.bindMouseListeners();
  transferFunctionWidget.onOpacityChange(macro.debounce(() => {
    transferFunctionWidget.applyOpacity(piecewiseFunction);
    renderWindow.render();
  }), 1000);
  lookupTable.onModified(() => {
    transferFunctionWidget.render();
    renderWindow.render();
  });
  // todo: use the transfer function widget for 2D images, too
  if (data.type.toString() === 'volumeRendering') {
    container.appendChild(widgetContainer);
    container.appendChild(toggleButton);
    container.appendChild(presetSelector);
    transferFunctionWidget.render();
  }

  const pipelineBuilder = VIEWER_MAPPING[data.type];
  if (pipelineBuilder) {
    pipeline = pipelineBuilder(data, renderer, renderWindow, piecewiseFunction, lookupTable);
  } else {
    window.alert(`No viewer found for ${data.type}`);
  }
  renderWindow.render();
  return pipeline;
}

function getPipeline() {
  return pipeline;
}

export default {
  createViewer,
  getPipeline,
};

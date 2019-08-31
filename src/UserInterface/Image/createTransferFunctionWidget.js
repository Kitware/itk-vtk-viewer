import vtkColorMaps from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps';
import vtkMouseRangeManipulator from 'vtk.js/Sources/Interaction/Manipulators/MouseRangeManipulator';
import vtkPiecewiseGaussianWidget from 'vtk.js/Sources/Interaction/Widgets/PiecewiseGaussianWidget';

import style from '../ItkVtkViewer.module.css';

function createTransferFunctionWidget(
  viewerStore,
  uiContainer,
  use2D
) {
  const piecewiseFunction = viewerStore.imageUI.piecewiseFunctionProxy.getPiecewiseFunction();
  const renderWindow = viewerStore.renderWindow;

  const transferFunctionWidget = vtkPiecewiseGaussianWidget.newInstance({
    numberOfBins: 256,
    size: [400, 150],
  });
  viewerStore.imageUI.transferFunctionWidget = transferFunctionWidget;
  let iconSize = 20;
  if (use2D) {
    iconSize = 0;
  }
  transferFunctionWidget.updateStyle({
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    histogramColor: 'rgba(30, 30, 30, 0.6)',
    strokeColor: 'rgb(0, 0, 0)',
    activeColor: 'rgb(255, 255, 255)',
    handleColor: 'rgb(50, 50, 150)',
    buttonDisableFillColor: 'rgba(255, 255, 255, 0.5)',
    buttonDisableStrokeColor: 'rgba(0, 0, 0, 0.5)',
    buttonStrokeColor: 'rgba(0, 0, 0, 1)',
    buttonFillColor: 'rgba(255, 255, 255, 1)',
    strokeWidth: 2,
    activeStrokeWidth: 3,
    buttonStrokeWidth: 1.5,
    handleWidth: 4,
    iconSize, // Can be 0 if you want to remove buttons (dblClick for (+) / rightClick for (-))
    padding: 10,
  });
  const dataArray = viewerStore.imageUI.image.getPointData().getScalars();
  transferFunctionWidget.setDataArray(dataArray.getData());

  const lookupTable = viewerStore.imageUI.lookupTableProxy.getLookupTable();

  const piecewiseWidgetContainer = document.createElement('div');
  piecewiseWidgetContainer.setAttribute('class', style.piecewiseWidget);

  transferFunctionWidget.setContainer(piecewiseWidgetContainer);
  transferFunctionWidget.bindMouseListeners();

  // Manage update when opacity changes
  transferFunctionWidget.onAnimation((start) => {
    if (start) {
      renderWindow.getInteractor().requestAnimation(transferFunctionWidget);
    } else {
      renderWindow.getInteractor().cancelAnimation(transferFunctionWidget);
      renderWindow.render();
    }
  });
  transferFunctionWidget.onOpacityChange(() => {
    if (!use2D) {
      transferFunctionWidget.applyOpacity(piecewiseFunction);
    }
    const colorDataRange = transferFunctionWidget.getOpacityRange();
    const preset = vtkColorMaps.getPresetByName(
      viewerStore.imageUI.lookupTableProxy.getPresetName()
    );
    lookupTable.applyColorMap(preset);
    lookupTable.setMappingRange(...colorDataRange);
    lookupTable.updateRange();

    if (!renderWindow.getInteractor().isAnimating()) {
      renderWindow.render();
    }
  });

  // Manage update when lookupTable changes
  lookupTable.onModified(() => {
    transferFunctionWidget.render();
    if (!renderWindow.getInteractor().isAnimating()) {
      renderWindow.render();
    }
  });

  transferFunctionWidget.setColorTransferFunction(lookupTable);
  if (use2D) {
    // Necessary side effect: addGaussian calls invokeOpacityChange, which
    // calls onOpacityChange, which updates the lut (does not have a low
    // opacity in 2D)
    transferFunctionWidget.addGaussian(0.5, 1.0, 0.5, 0.0, 3.0);
  } else {
    transferFunctionWidget.addGaussian(0.5, 1.0, 0.5, 0.5, 0.4);
  }
  transferFunctionWidget.applyOpacity(piecewiseFunction);
  transferFunctionWidget.render();

  const transferFunctionWidgetRow = document.createElement('div');
  transferFunctionWidgetRow.setAttribute('class', style.uiRow);
  transferFunctionWidgetRow.className += ` ${viewerStore.id}-toggle`;
  transferFunctionWidgetRow.appendChild(piecewiseWidgetContainer);
  uiContainer.appendChild(transferFunctionWidgetRow);

  // Create range manipulator
  const rangeManipulator = vtkMouseRangeManipulator.newInstance({
    button: 1,
    alt: true,
  });

  // Window
  const windowMotionScale = 150.0;
  const windowGet = () => {
    const gaussian = transferFunctionWidget.getGaussians()[0];
    return gaussian.width * windowMotionScale;
  };
  const windowSet = (value) => {
    const gaussians = transferFunctionWidget.getGaussians();
    const newGaussians = gaussians.slice();
    newGaussians[0].width = value / windowMotionScale;
    transferFunctionWidget.setGaussians(newGaussians);
  };
  rangeManipulator.setVerticalListener(
    0,
    windowMotionScale,
    1,
    windowGet,
    windowSet
  );

  // Level
  const levelMotionScale = 150.0;
  const levelGet = () => {
    const gaussian = transferFunctionWidget.getGaussians()[0];
    return gaussian.position * levelMotionScale;
  };
  const levelSet = (value) => {
    const gaussians = transferFunctionWidget.getGaussians();
    const newGaussians = gaussians.slice();
    newGaussians[0].position = value / levelMotionScale;
    transferFunctionWidget.setGaussians(newGaussians);
  };
  rangeManipulator.setHorizontalListener(
    0,
    levelMotionScale,
    1,
    levelGet,
    levelSet
  );

  // Add range manipulator
  viewerStore.itkVtkView.getInteractorStyle2D().addMouseManipulator(rangeManipulator);
  viewerStore.itkVtkView.getInteractorStyle3D().addMouseManipulator(rangeManipulator);

  const opacityRangeManipulator = vtkMouseRangeManipulator.newInstance({
    button: 3, // Right mouse
    alt: true,
  });
  const opacityRangeManipulatorShift = vtkMouseRangeManipulator.newInstance({
    button: 1, // Left mouse
    shift: true, // For the macOS folks
    alt: true,
  });

  // Opacity
  const opacityMotionScale = 200.0;
  const opacityGet = () => {
    const gaussian = transferFunctionWidget.getGaussians()[0];
    return gaussian.height * opacityMotionScale;
  };
  const opacitySet = (value) => {
    const gaussians = transferFunctionWidget.getGaussians();
    const newGaussians = gaussians.slice();
    newGaussians[0].height = value / opacityMotionScale;
    transferFunctionWidget.setGaussians(newGaussians);
  };
  opacityRangeManipulator.setVerticalListener(
    0,
    opacityMotionScale,
    1,
    opacityGet,
    opacitySet
  );
  opacityRangeManipulatorShift.setVerticalListener(
    0,
    opacityMotionScale,
    1,
    opacityGet,
    opacitySet
  );
  viewerStore.itkVtkView.getInteractorStyle3D().addMouseManipulator(opacityRangeManipulator);
  viewerStore.itkVtkView.getInteractorStyle3D().addMouseManipulator(opacityRangeManipulatorShift);
}

export default createTransferFunctionWidget;

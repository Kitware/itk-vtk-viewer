import style from '../ItkVtkViewer.module.css';

import distanceIcon from '../icons/length-tool.svg';
import { reaction, action } from 'mobx';
import getContrastSensitiveStyle from '../getContrastSensitiveStyle';
import vtkDistanceWidget from 'vtk.js/Sources/Interaction/Widgets/DistanceWidget';
import vtkDistanceRepresentation from 'vtk.js/Sources/Interaction/Widgets/DistanceRepresentation';
import * as vtkMath from 'vtk.js/Sources/Common/Core/Math';

function createDistanceButton(
  store,
  uiContainer,
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton', 'distanceLabel'],
    store.isBackgroundDark,
  );

  store.imageUI.distanceWidget = vtkDistanceWidget.newInstance();
  store.imageUI.distanceWidget.setInteractor(store.itkVtkView.getInteractor());

  const distanceRep = vtkDistanceRepresentation.newInstance();
  store.imageUI.distanceWidget.setWidgetRep(distanceRep);

  // Need three decimal places, not two
  distanceRep.setNumberOfDecimals(3);
  distanceRep.getLineProperty().setColor(1, 1, 1);
  distanceRep.getEndPointProperty().setColor(1, 1, 1);
  distanceRep.getEndPoint2Property().setColor(1, 1, 1);
  store.imageUI.distanceWidget.setEnabled(false);

  store.imageUI.distanceUpdateInProgress = false;
  store.imageUI.distanceEnabled = false;
  const toggleLength = () => {
    if (store.mainUI.viewMode !== 'VolumeRendering') {
      store.imageUI.distanceEnabled = !store.imageUI.distanceEnabled;
      if (store.imageUI.distanceWidget.getEnabled() !== true) {
        store.imageUI.distanceWidget.setEnabled(true);
        store.imageUI.distanceWidget.onInteractionEvent(() => {
          store.imageUI.distanceP1 = distanceRep.getPoint1WorldPosition();
          store.imageUI.distanceP2 = distanceRep.getPoint2WorldPosition();
        });
      }
    } else {
      store.imageUI.distanceEnabled = false;
    }
    if (store.imageUI.distanceEnabled) {
      store.imageUI.distanceWidget.setWidgetStateToStart();
    } else {
      store.imageUI.distanceWidget.setEnabled(false);
    }
    store.renderWindow.render();
  };

  const distanceEntry = document.createElement('div');
  distanceEntry.setAttribute('class', style.distanceEntry);

  const distanceButton = document.createElement('span');
  distanceButton.innerHTML = `<input id="${store.id}-toggleDistanceButton" type="checkbox" class="${
    style.toggleInput
  }" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Length" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.distanceButton} ${
    style.toggleButton
  }" for="${store.id}-toggleDistanceButton">${distanceIcon}</label>`;
  store.imageUI.distanceButtonInput = distanceButton.children[0];
  store.imageUI.distanceButtonInput.checked = store.imageUI.distanceEnabled;

  distanceButton.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleLength();
    });

  // Disable if in volume mode
  reaction(() => { return store.mainUI.viewMode; },
    (viewMode) => {
      store.imageUI.distanceWidget.setEnabled(false);
      store.imageUI.distanceEnabled = false;
      store.renderWindow.render();
    });

  distanceEntry.appendChild(distanceButton);

  const distanceLabel = document.createElement('label');
  distanceLabel.setAttribute('class', contrastSensitiveStyle.distanceLabel);
  distanceLabel.setAttribute('for', `${store.id}-distanceValue`);
  distanceLabel.id = `${store.id}-distanceLabel`;
  distanceLabel.innerText = 'Length:';
  distanceEntry.appendChild(distanceLabel);

  const distanceValue = document.createElement('input');
  distanceValue.type = 'text';
  distanceValue.setAttribute('class', style.distanceInput);
  distanceValue.id = `${store.id}-distanceValue`;
  distanceValue.setAttribute('name', 'length');
  distanceValue.setAttribute('value', '0');
  distanceValue.setAttribute('disabled', true);
  distanceEntry.appendChild(distanceValue);

  const distanceDXLabel = document.createElement('label');
  distanceDXLabel.setAttribute('class', contrastSensitiveStyle.distanceLabel);
  distanceDXLabel.setAttribute('for', `${store.id}-distanceDXValue`);
  distanceDXLabel.id = `${store.id}-distanceDXLabel`;
  distanceDXLabel.innerText = 'dX:';
  distanceEntry.appendChild(distanceDXLabel);

  const distanceDXValue = document.createElement('input');
  distanceDXValue.type = 'text';
  distanceDXValue.setAttribute('class', style.distanceInput);
  distanceDXValue.id = `${store.id}-distanceDXValue`;
  distanceDXValue.setAttribute('name', 'length');
  distanceDXValue.setAttribute('value', '0');
  distanceDXValue.setAttribute('disabled', true);
  distanceEntry.appendChild(distanceDXValue);

  const distanceDYLabel = document.createElement('label');
  distanceDYLabel.setAttribute('class', contrastSensitiveStyle.distanceLabel);
  distanceDYLabel.setAttribute('for', `${store.id}-distanceDYValue`);
  distanceDYLabel.id = `${store.id}-distanceDYLabel`;
  distanceDYLabel.innerText = 'dY:';
  distanceEntry.appendChild(distanceDYLabel);

  const distanceDYValue = document.createElement('input');
  distanceDYValue.type = 'text';
  distanceDYValue.setAttribute('class', style.distanceInput);
  distanceDYValue.id = `${store.id}-distanceDYValue`;
  distanceDYValue.setAttribute('name', 'length');
  distanceDYValue.setAttribute('value', '0');
  distanceDYValue.setAttribute('disabled', true);
  distanceEntry.appendChild(distanceDYValue);

  const distanceDZLabel = document.createElement('label');
  distanceDZLabel.setAttribute('class', contrastSensitiveStyle.distanceLabel);
  distanceDZLabel.setAttribute('for', `${store.id}-distanceDZValue`);
  distanceDZLabel.id = `${store.id}-distanceDZLabel`;
  distanceDZLabel.innerText = 'dZ:';
  distanceEntry.appendChild(distanceDZLabel);

  const distanceDZValue = document.createElement('input');
  distanceDZValue.type = 'text';
  distanceDZValue.setAttribute('class', style.distanceInput);
  distanceDZValue.id = `${store.id}-distanceDzValue`;
  distanceDZValue.setAttribute('name', 'length');
  distanceDZValue.setAttribute('value', '0');
  distanceDZValue.setAttribute('disabled', true);
  distanceEntry.appendChild(distanceDZValue);

  uiContainer.appendChild(distanceEntry);

  // Update the value field when distance is updated
  reaction(() => { return store.imageUI.distanceP1; },
    () => {
      let p1Position = store.imageUI.distanceP1;
      let p2Position = store.imageUI.distanceP2;
      let delta = (Math.sqrt(vtkMath.distance2BetweenPoints(p1Position, p2Position)) * 1000.0).toFixed(0);
      let dX = ((p1Position[0] - p2Position[0]) * 1000.0).toFixed(0);
      let dY = ((p1Position[1] - p2Position[1]) * 1000.0).toFixed(0);
      let dZ = ((p1Position[2] - p2Position[2]) * 1000.0).toFixed(0);

      distanceValue.setAttribute('value', `${delta}`);
      distanceDXValue.setAttribute('value', `${dX}`);
      distanceDYValue.setAttribute('value', `${dY}`);
      distanceDZValue.setAttribute('value', `${dZ}`);
    });
}

export default createDistanceButton;

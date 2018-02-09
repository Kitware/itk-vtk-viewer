import macro from 'vtk.js/Sources/macro';

import vtkViewProxy from 'vtk.js/Sources/Proxy/Core/ViewProxy';
import vtkCellPicker from 'vtk.js/Sources/Rendering/Core/CellPicker';

const { vtkErrorMacro } = macro;

// ----------------------------------------------------------------------------
// ItkVtkViewProxy methods
// ----------------------------------------------------------------------------

function ItkVtkViewProxy(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('ItkVtkViewProxy');

  // Private --------------------------------------------------------------------
  //
  function setVisualizationMode(axisIndex) {
    // volume rendering
    if (axisIndex === -1) {
      model.interactor.setInteractorStyle(model.interactorStyle3D);
      if (model.volumeRenderingCameraState) {
        model.camera.setFocalPoint(
          ...model.volumeRenderingCameraState.focalPoint
        );
        model.camera.setPosition(...model.volumeRenderingCameraState.position);
        model.camera.setViewUp(...model.volumeRenderingCameraState.viewUp);
        model.camera.setViewAngle(model.volumeRenderingCameraState.viewAngle);
        model.camera.setParallelScale(
          model.volumeRenderingCameraState.parallelScale
        );
        model.camera.setPhysicalTranslation(
          ...model.volumeRenderingCameraState.physicalTranslation
        );
      }
      model.camera.setParallelProjection(false);
      if (model.volumeRepresentation) {
        model.volumeRepresentation.setSliceVisibility(model.viewPlanes);
        model.volumeRepresentation.setVolumeVisibility(true);
      }
    } else {
      model.camera.setParallelProjection(true);
      model.interactor.setInteractorStyle(model.interactorStyle2D);
      if (model.volumeRepresentation) {
        model.volumeRepresentation.setVolumeVisibility(false);
        model.volumeRepresentation.getActors().forEach((actor, index) => {
          if (index === axisIndex) {
            actor.setVisibility(true);
          } else {
            actor.setVisibility(false);
          }
        });
      }
      switch (axisIndex) {
        case 0:
          publicAPI.updateOrientation(0, 1, [0, 0, 1]);
          break;
        case 1:
          publicAPI.updateOrientation(1, -1, [0, 0, 1]);
          break;
        case 2:
          publicAPI.updateOrientation(2, 1, [0, 1, 0]);
          break;
        default:
          vtkErrorMacro('Unexpected view mode');
      }
    }
  }

  function leftPad(value) {
    const valueString = String(value);
    const padLength = valueString.length < 3 ? 3 - valueString.length : 0;
    const pad = '&nbsp;'.repeat(padLength);
    return `${pad}${valueString}`;
  }

  function rightPad(value) {
    const valueString = String(value);
    const padLength = valueString.length < 12 ? 12 - valueString.length : 0;
    const pad = '&nbsp;'.repeat(padLength);
    return `${valueString}${pad}`;
  }

  function updateAnnotations(event) {
    const renderPosition = model.interactor.getEventPosition(0);
    model.annotationPicker.pick(
      [renderPosition.x, renderPosition.y, 0.0],
      model.renderer
    );
    const ijk = model.annotationPicker.getCellIJK();
    if (model.volumeRepresentation) {
      const imageData = model.volumeRepresentation.getInputDataSet();
      const size = imageData.getDimensions();
      const scalarData = imageData.getPointData().getScalars();
      const value = scalarData.getTuple(
        size[0] * size[1] * ijk[2] + size[0] * ijk[1] + ijk[0]
      );
      // currently broken
      // const worldPosition = model.annotationPicker.getPickPosition();
      if (ijk.length > 0) {
        publicAPI.updateCornerAnnotation({
          iIndex: leftPad(ijk[0]),
          jIndex: leftPad(ijk[1]),
          kIndex: leftPad(ijk[2]),
          value: rightPad(value),
        });
      }
    }
  }

  // Setup --------------------------------------------------------------------

  // todo: set up corner annotation
  publicAPI.setCornerAnnotation(
    'se',
    'Index: ${iIndex}, ${jIndex}, ${kIndex}<br>Value:&nbsp;&nbsp;${value}'
  );
  publicAPI.updateCornerAnnotation({
    iIndex: '&nbsp;N/A',
    jIndex: '&nbsp;N/A',
    kIndex: '&nbsp;N/A',
    value:
      'N/A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
  });
  publicAPI.setAnnotationOpacity(0.0);
  model.annotationPicker = vtkCellPicker.newInstance();
  model.annotationPicker.setPickFromList(1);
  model.annotationPicker.initializePickList();
  model.interactor.onMouseMove((event) => {
    updateAnnotations(event);
  });
  model.interactor.onPinch((event) => {
    updateAnnotations(event);
  });

  // use the same color map in the planes
  // colormap changes with window / level
  // window / level changes piecewise =jk
  publicAPI.resetOrientation();

  // API ----------------------------------------------------------------------

  publicAPI.setViewMode = (mode) => {
    if (model.viewMode === 'VolumeRendering') {
      model.volumeRenderingCameraState = model.camera.getState();
    }
    switch (mode) {
      case 'XPlane':
        model.viewMode = mode;
        setVisualizationMode(0);
        break;
      case 'YPlane':
        model.viewMode = mode;
        setVisualizationMode(1);
        break;
      case 'ZPlane':
        model.viewMode = mode;
        setVisualizationMode(2);
        break;
      case 'VolumeRendering':
        model.viewMode = mode;
        setVisualizationMode(-1);
        break;
      default:
        vtkErrorMacro('Unexpected view mode');
    }
    publicAPI.resetCamera();
  };

  publicAPI.setViewPlanes = (viewPlanes) => {
    model.viewPlanes = viewPlanes;
    if (model.viewMode === 'VolumeRendering' && model.volumeRepresentation) {
      model.volumeRepresentation.setSliceVisibility(viewPlanes);
      model.renderWindow.render();
    }
  };

  publicAPI.setOrientationAnnotationVisibility = (visible) => {
    if (visible) {
      if (model.volumeRepresentation) {
        publicAPI.setAnnotationOpacity(1.0);
        model.orientationWidget.setEnabled(true);
        model.renderWindow.render();
      }
    } else {
      publicAPI.setAnnotationOpacity(0.0);
      model.orientationWidget.setEnabled(false);
      model.renderWindow.render();
    }
  };

  const superAddRepresentation = publicAPI.addRepresentation;
  publicAPI.addRepresentation = (representation) => {
    superAddRepresentation(representation);

    if (!representation) {
      return;
    }

    const volumeRepresentations = model.representations.filter((rep) => {
      const isVolumeRepresentation = !!rep.getVolumes().length;
      return isVolumeRepresentation;
    });
    if (volumeRepresentations[0]) {
      model.volumeRepresentation = volumeRepresentations[0];
      model.volumeRepresentation
        .getActors()
        .forEach(model.annotationPicker.addPickList);
      publicAPI.setAnnotationOpacity(1.0);
    }
  };

  const superRemoveRepresentation = publicAPI.removeRepresentation;
  publicAPI.removeRepresentation = (representation) => {
    superRemoveRepresentation(representation);

    if (!representation) {
      return;
    }
    representation.getActors().forEach(model.annotationPicker.deletePickList);
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  viewMode: 'VolumeRendering',
  viewPlanes: false,
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  vtkViewProxy.extend(publicAPI, model, initialValues);
  macro.get(publicAPI, model, ['viewMode', 'viewPlanes']);

  // Object specific methods
  ItkVtkViewProxy(publicAPI, model);
}
// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'ItkVtkViewProxy');

// ----------------------------------------------------------------------------

export default { newInstance, extend };

import macro from 'vtk.js/Sources/macro';

import vtkViewProxy from 'vtk.js/Sources/Proxy/Core/ViewProxy';
// import vtkManipulators from 'vtk.js/Sources/Interaction/Manipulators';

const { vtkErrorMacro } = macro;

// ----------------------------------------------------------------------------
// ItkVtkViewProxy methods
// ----------------------------------------------------------------------------

function ItkVtkViewProxy(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('ItkVtkViewProxy');

  // Private --------------------------------------------------------------------
  //
  function setVisualizationMode(volumeRepresentation, axisIndex) {
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
      }
      model.camera.setParallelProjection(false);
      volumeRepresentation.setSliceVisibility(false);
      volumeRepresentation.setVolumeVisibility(true);
    } else {
      model.camera.setParallelProjection(true);
      model.interactor.setInteractorStyle(model.interactorStyle2D);
      volumeRepresentation.setVolumeVisibility(false);
      volumeRepresentation.getActors().forEach((actor, index) => {
        if (index === axisIndex) {
          actor.setVisibility(true);
        } else {
          actor.setVisibility(false);
        }
      });
      switch (axisIndex) {
        case 0:
          publicAPI.updateOrientation(0, 1, [0, 0, 1]);
          break;
        case 1:
          publicAPI.updateOrientation(1, -1, [0, 0, 1]);
          break;
        case 2:
          publicAPI.updateOrientation(2, 1, [0, -1, 0]);
          break;
        default:
          vtkErrorMacro('Unexpected view mode');
      }
    }
  }

  // Setup --------------------------------------------------------------------
  model.viewMode = 'VolumeRendering';

  // todo: set up corner annotation

  // API ----------------------------------------------------------------------

  publicAPI.setViewMode = (mode) => {
    const volumeRepresentations = model.representations.filter((rep) => {
      const isVolumeRepresentation = !!rep.getVolumes().length;
      return isVolumeRepresentation;
    });
    console.log(model.viewMode);
    if (model.viewMode === 'VolumeRendering') {
      model.volumeRenderingCameraState = model.camera.getState();
      console.log(model.volumeRenderingCameraState);
    }
    switch (mode) {
      case 'XPlane':
        model.viewMode = mode;
        setVisualizationMode(volumeRepresentations[0], 0);
        break;
      case 'YPlane':
        model.viewMode = mode;
        setVisualizationMode(volumeRepresentations[0], 1);
        break;
      case 'ZPlane':
        model.viewMode = mode;
        setVisualizationMode(volumeRepresentations[0], 2);
        break;
      case 'VolumeRendering':
        model.viewMode = mode;
        setVisualizationMode(volumeRepresentations[0], -1);
        break;
      default:
        vtkErrorMacro('Unexpected view mode');
    }
    publicAPI.resetCamera();
  };

  publicAPI.resetOrientation();
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  viewMode: 'VolumeRendering',
  volumeRenderingAxis: 1,
  volumeRenderingOrientation: 1,
  volumeRenderingViewUp: [0, 0, 1],
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  vtkViewProxy.extend(publicAPI, model, initialValues);
  macro.get(publicAPI, model, ['viewMode']);

  // Object specific methods
  ItkVtkViewProxy(publicAPI, model);
}
// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'ItkVtkViewProxy');

// ----------------------------------------------------------------------------

export default { newInstance, extend };

import vtkImageMapper          from 'vtk.js/Sources/Rendering/Core/ImageMapper';
import vtkImageSlice           from 'vtk.js/Sources/Rendering/Core/ImageSlice';
import vtkInteractorStyleImage from 'vtk.js/Sources/Interaction/Style/InteractorStyleImage';

export default function imageRendering(data, renderer, renderWindow, piecewiseFunction, lookupTable) {
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
}

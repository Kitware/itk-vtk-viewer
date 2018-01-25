import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkVolumeMapper from 'vtk.js/Sources/Rendering/Core/VolumeMapper';
import vtkBoundingBox from 'vtk.js/Sources/Common/DataModel/BoundingBox';

export default function volumeRendering(
  data,
  renderer,
  renderWindow,
  piecewiseFunction,
  lookupTable
) {
  const internalPipeline = { renderer, renderWindow };

  const actor = vtkVolume.newInstance();
  const mapper = vtkVolumeMapper.newInstance();
  const source = data.image;
  const dataRange = data.image
    .getPointData()
    .getScalars()
    .getRange();

  // Pipeline handling
  mapper.setInputData(data.image);
  actor.setMapper(mapper);

  const sampleDistance =
    0.7 *
    Math.sqrt(
      source
        .getSpacing()
        .map((v) => v * v)
        .reduce((a, b) => a + b, 0)
    );
  mapper.setSampleDistance(sampleDistance);
  actor.getProperty().setRGBTransferFunction(0, lookupTable);
  actor.getProperty().setScalarOpacity(0, piecewiseFunction);
  actor.getProperty().setInterpolationTypeToFastLinear();

  // For better looking volume rendering
  // - distance in world coordinates a scalar opacity of 1.0
  actor
    .getProperty()
    .setScalarOpacityUnitDistance(
      0,
      vtkBoundingBox.getDiagonalLength(source.getBounds()) /
        Math.max(...source.getDimensions())
    );
  // - control how we emphasize surface boundaries
  //  => max should be around the average gradient magnitude for the
  //     volume or maybe average plus one std dev of the gradient magnitude
  //     (adjusted for spacing, this is a world coordinate gradient, not a
  //     pixel gradient)
  //  => max hack: (dataRange[1] - dataRange[0]) * 0.05
  actor.getProperty().setGradientOpacityMinimumValue(0, 0);
  actor
    .getProperty()
    .setGradientOpacityMaximumValue(0, (dataRange[1] - dataRange[0]) * 0.05);
  // - Use shading based on gradient
  actor.getProperty().setShade(true);
  actor.getProperty().setUseGradientOpacity(0, true);
  // - generic good default
  actor.getProperty().setGradientOpacityMinimumOpacity(0, 0.0);
  actor.getProperty().setGradientOpacityMaximumOpacity(0, 1.0);
  actor.getProperty().setAmbient(0.2);
  actor.getProperty().setDiffuse(0.7);
  actor.getProperty().setSpecular(0.3);
  actor.getProperty().setSpecularPower(8.0);

  mapper.setInputData(data.image);

  renderer.addVolume(actor);
  renderer.resetCamera();
  renderer.getActiveCamera().elevation(20);
  renderer.getActiveCamera().azimuth(30);
  renderer.updateLightsGeometryToFollowCamera();
  renderWindow.render();

  Object.assign(internalPipeline, { actor, mapper });

  return internalPipeline;
}

import vtkHttpDataAccessHelper from 'vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData';
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray';

import itkreadImageFile from 'itk/dist/itkreadImageFile';

import viewer from './viewer';
import helper from './helper';

const fetchZip = url => vtkHttpDataAccessHelper.fetchZipFile(url);

const processData = (container, { file, ext }) => {
  helper.emptyContainer(container);
  helper.createLoadingProgress(container);

  /* eslint-disable new-cap */
  itkreadImageFile(file).then((itkImage) => {
    const array = {
      values: itkImage.buffer,
      numberOfComponents: itkImage.imageType.components,
    };

    const vtkImage = {
      origin: [0, 0, 0],
      spacing: [1, 1, 1],
    };

    const dimensions = [1, 1, 1];

    for (let idx = 0; idx < itkImage.imageType.dimension; ++idx) {
      vtkImage.origin[idx] = itkImage.origin[idx];
      vtkImage.spacing[idx] = itkImage.spacing[idx];
      dimensions[idx] = itkImage.size[idx];
    }

    // Create VTK Image Data
    const imageData = vtkImageData.newInstance(vtkImage);
    const scalar = vtkDataArray.newInstance(array);
    imageData.setDimensions(...dimensions);
    imageData.getPointData().setScalars(scalar);

    viewer.createViewer(container, {
      type: 'volumeRenderering',
      image: imageData,
    });
  });
};

export default {
  fetchZip,
  processData,
};

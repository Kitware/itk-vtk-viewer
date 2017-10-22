import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData';
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray';

import itkreadImageFile from 'itk/readImageFile';
import Matrix from 'itk/Matrix';
import getMatrixElement from 'itk/getMatrixElement';

import viewers from './viewers';
import helper from './helper';

const convertItkImageToVtkImage = (itkImage) => {
  const array = {
    values: itkImage.buffer,
    numberOfComponents: itkImage.imageType.components,
  };

  const vtkImage = {
    origin: [0, 0, 0],
    spacing: [1, 1, 1],
  };

  const dimensions = [1, 1, 1];

  const direction = new Matrix(3, 3);
  direction.setIdentity();

  for (let idx = 0; idx < itkImage.imageType.dimension; ++idx) {
    vtkImage.origin[idx] = itkImage.origin[idx];
    vtkImage.spacing[idx] = itkImage.spacing[idx];
    dimensions[idx] = itkImage.size[idx];
    for (let col = 0; col < itkImage.imageType.dimension; ++col) {
      direction.setElement(idx, col, getMatrixElement(itkImage.direction, idx, col));
    }
  }

  // Create VTK Image Data
  const imageData = vtkImageData.newInstance(vtkImage);
  const scalar = vtkDataArray.newInstance(array);
  imageData.setDirection(direction.data);
  imageData.setDimensions(...dimensions);
  imageData.getPointData().setScalars(scalar);

  return imageData;
};

const processData = (container, { file, use2D }) => {
  helper.emptyContainer(container);
  helper.createLoadingProgress(container);

  /* eslint-disable new-cap */
  return new Promise((resolve, reject) => {
    itkreadImageFile(file).then((itkImage) => {
      const imageData = convertItkImageToVtkImage(itkImage);
      const dimensions = imageData.getDimensions();
      const is3D = !dimensions.filter(i => i === 1).length && !use2D;

      resolve(viewers.createViewer(container, {
        type: is3D ? 'volumeRendering' : 'imageRendering',
        image: imageData,
      }));
    });
  });
};

export default {
  convertItkImageToVtkImage,
  processData,
};

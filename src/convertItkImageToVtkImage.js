import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData';
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray';

import Matrix from 'itk/Matrix';
import getMatrixElement from 'itk/getMatrixElement';

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

export default convertItkImageToVtkImage;

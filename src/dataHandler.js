import vtkHttpDataAccessHelper from 'vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData';
import vtkDataArray from 'vtk.js/Sources/Common/Core/ImageData';

import NrrdReader from 'itk/dist/itkImageIOs/itkNrrdImageIOJSBinding';

import viewer from './viewer';

function fetchZip(url) {
  return vtkHttpDataAccessHelper.fetchZipFile(url);
}

function processData(container, { file, ext }) {
  /* eslint-disable new-cap */
  // FIXME --------------------------------------------------------------------
  const filePath = '';
  NrrdReader.mountContainingDirectory(filePath);

  const reader = new NrrdReader.ITKImageIO();
  reader.SetFileName(filePath);
  // reader.SetFileContent(file); // <--- Something like that for web
  reader.ReadImageInformation();

  const array = {
    values: reader.Read(),
    numberOfComponents: reader.GetNumberOfComponents(),
  };

  const image = {
    origin: [0, 0, 0],
    spacing: [1, 1, 1],
  };

  const dimensions = [1, 1, 1];

  for (let idx = 0; idx < reader.GetNumberOfDimensions(); idx++) {
    image.origin[idx] = reader.GetOrigin(idx);
    image.spacing[idx] = reader.GetSpacing(idx);
    dimensions[idx] = reader.GetDimensions(idx);
  }
  NrrdReader.unmountContainingDirectory(filePath);

  // Create VTK Image Data
  const imageData = vtkImageData.newInstance(image);
  const scalar = vtkDataArray.newInstance(array);
  imageData.setDimension(...dimensions);
  imageData.getPointData().setScalars(scalar);
  // FIXME --------------------------------------------------------------------

  viewer.createViewer(container, {
    type: 'volumeRenderering',
    image: imageData,
  });
}

export default {
  fetchZip,
  processData,
};

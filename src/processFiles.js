import itkreadImageFile from 'itk/readImageFile';
import itkreadImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';

import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper';

import userInterface from './userInterface';
import createViewer from './createViewer';

const processFiles = (container, { files, use2D }) => {
  userInterface.emptyContainer(container);
  userInterface.createLoadingProgress(container);

  /* eslint-disable new-cap */
  return new Promise((resolve, reject) => {
    let reader = itkreadImageDICOMFileSeries;
    let arg = files;
    if (files.length === 1) {
      reader = itkreadImageFile;
      arg = files[0];
    }
    reader(null, arg).then(({ image: itkImage, webWorker }) => {
      webWorker.terminate()
      const imageData = vtkITKHelper.convertItkToVtkImage(itkImage);
      const is3D = itkImage.imageType.dimension === 3 && !use2D;

      resolve(
        createViewer(container, {
          image: imageData,
          use2D: !is3D,
        })
      );
    }).catch((error) => {
      reject(error);
    });
  });
};

export default processFiles;

import itkreadImageFile from 'itk/readImageFile';
import itkreadImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';

import userInterface from './userInterface';
import convertItkImageToVtkImage from './convertItkImageToVtkImage';
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
    reader(arg).then((itkImage) => {
      const imageData = convertItkImageToVtkImage(itkImage);
      const is3D = itkImage.imageType.dimension === 3 && !use2D;

      resolve(
        createViewer(container, {
          image: imageData,
          use2D: !is3D,
        })
      );
    });
  });
};

export default processFiles;

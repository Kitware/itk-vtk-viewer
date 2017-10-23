import itkreadImageFile from 'itk/readImageFile';

import viewers from './viewers';
import userInterface from './userInterface';
import convertItkImageToVtkImage from './convertItkImageToVtkImage';


const processData = (container, { file, use2D }) => {
  userInterface.emptyContainer(container);
  userInterface.createLoadingProgress(container);

  /* eslint-disable new-cap */
  return new Promise((resolve, reject) => {
    itkreadImageFile(file).then((itkImage) => {
      console.log(convertItkImageToVtkImage);
      const imageData = convertItkImageToVtkImage(itkImage);
      const is3D = itkImage.imageType.dimension === 3 && !use2D;

      resolve(viewers.createViewer(container, {
        type: is3D ? 'volumeRendering' : 'imageRendering',
        image: imageData,
      }));
    });
  });
};

export default {
  processData,
};

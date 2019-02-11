import readImageFile from 'itk/readImageFile';
import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';
import readMeshFile from 'itk/readMeshFile';
import runPipelineBrowser from 'itk/runPipelineBrowser'
import IOTypes from 'itk/IOTypes'
import getFileExtension from 'itk/getFileExtension'
import extensionToMeshIO from 'itk/extensionToMeshIO'
import vtk from 'vtk.js/Sources/vtk'

import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper';

import userInterface from './userInterface';
import createViewer from './createViewer';

function typedArrayForBuffer(typedArrayType, buffer) {
  let typedArrayFunction = null
  if(typeof window !== 'undefined') {
    // browser
    typedArrayFunction = window[typedArrayType]
  } else {
    typedArrayFunction = global[typedArrayType]
  }
  return new typedArrayFunction(buffer)
}

const processFiles = (container, { files, use2D }) => {
  userInterface.emptyContainer(container);
  userInterface.createLoadingProgress(container);

  /* eslint-disable new-cap */
  return new Promise((resolve, reject) => {
    readImageDICOMFileSeries(null, files).then(({ image: itkImage, webWorker }) => {
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
      const readers = Array.from(files).map((file) => {
        const extension = getFileExtension(file.name)
        if(extensionToMeshIO.hasOwnProperty(extension)) {
          let is3D = true
          return readMeshFile(null, file).then(({ mesh: itkMesh, webWorker }) => {
            webWorker.terminate()
            const pipelinePath = 'MeshToPolyData'
            const args = ['mesh.json', 'polyData.json']
            const desiredOutputs = [
              { path: args[1], type: IOTypes.vtkPolyData }
            ]
            const inputs = [
              { path: args[0], type: IOTypes.Mesh, data: itkMesh }
            ]
            is3D = itkMesh.meshType.dimension === 3
            return runPipelineBrowser(null, pipelinePath, args, desiredOutputs, inputs)
          }).then(function ({ outputs, webWorker }) {
            webWorker.terminate()
            return Promise.resolve({ is3D, data: vtk(outputs[0].data) })
          }).catch((error) => {
            return readImageFile(null, file).then(({ image: itkImage, webWorker }) => {
              webWorker.terminate()
              is3D = itkImage.imageType.dimension === 3 && !use2D;
              const imageData = vtkITKHelper.convertItkToVtkImage(itkImage);
              return Promise.resolve({ is3D, data: imageData})
            }).catch((error) => {
              reject(error)
            })
          })
        }
        return readImageFile(null, file).then(({ image: itkImage, webWorker }) => {
          webWorker.terminate()
          const is3D = itkImage.imageType.dimension === 3 && !use2D;
          const imageData = vtkITKHelper.convertItkToVtkImage(itkImage);
          return Promise.resolve({ is3D, data: imageData })
        }).catch((error) => {
          reject(error)
        })
      })
      Promise.all(readers).then((dataSets) => {
        const images = dataSets.filter(({ data }) => data.isA('vtkImageData')).map(({ data }) => data)
        const image = images.length ? images[0] : null
        const geometries = dataSets.filter(({ data }) => data.isA('vtkPolyData')).map(({ data }) => data)
        const any3D  = ! dataSets.map(({ is3D }) => is3D).every((is3D) => !is3D)
        const is3D = any3D && !use2D;
        resolve(
          createViewer(container, {
            image,
            geometries,
            use2D: !is3D,
          })
        );
      })
      })
    });

};

export default processFiles;

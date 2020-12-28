import readImageFile from 'itk/readImageFile'
import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries'
import readMeshFile from 'itk/readMeshFile'
import readPolyDataFile from 'itk/readPolyDataFile'
import runPipelineBrowser from 'itk/runPipelineBrowser'
import IOTypes from 'itk/IOTypes'
import FloatTypes from 'itk/FloatTypes'
import getFileExtension from 'itk/getFileExtension'
import extensionToMeshIO from 'itk/extensionToMeshIO'
import extensionToPolyDataIO from 'itk/extensionToPolyDataIO'
import vtk from 'vtk.js/Sources/vtk'
import vtkXMLPolyDataReader from 'vtk.js/Sources/IO/XML/XMLPolyDataReader'
import vtkXMLImageDataReader from 'vtk.js/Sources/IO/XML/XMLImageDataReader'
import PromiseFileReader from 'promise-file-reader'

import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

import UserInterface from '../UserInterface'
import createViewer from '../createViewer'

function typedArrayForBuffer(typedArrayType, buffer) {
  let typedArrayFunction = null
  if (typeof window !== 'undefined') {
    // browser
    typedArrayFunction = window[typedArrayType]
  } else {
    typedArrayFunction = global[typedArrayType]
  }
  return new typedArrayFunction(buffer)
}

export const processFiles = async (
  container,
  { files, image, labelImage, labelImageNames, rotate, use2D }
) => {
  UserInterface.emptyContainer(container)
  UserInterface.createLoadingProgress(container)
  const config = await readFiles({
    files,
    image,
    labelImage,
    labelImageNames,
    use2D,
  })
  config.rotate = rotate
  return createViewer(container, config)
}

export const readFiles = async ({
  files,
  image,
  labelImage,
  labelImageNames,
  rotate,
  use2D,
}) => {
  let readDICOMSeries = readImageDICOMFileSeries
  if (files.length < 2 || !!!image) {
    readDICOMSeries = function() {
      return Promise.reject('Skip DICOM series read attempt')
    }
  }
  try {
    const { image: itkImage, webWorkerPool } = await readDICOMSeries(files)
    itkImage.name = files[0].name
    const is3D = itkImage.imageType.dimension === 3 && !use2D
    return {
      image: itkImage,
      labelImage,
      use2D: !is3D,
    }
  } catch (error) {
    const readers = Array.from(files).map(async file => {
      const extension = getFileExtension(file.name)
      if (extension === 'vti') {
        return PromiseFileReader.readAsArrayBuffer(file).then(fileContents => {
          const vtiReader = vtkXMLImageDataReader.newInstance()
          vtiReader.parseAsArrayBuffer(fileContents)
          return Promise.resolve({
            is3D: true,
            data: vtiReader.getOutputData(0),
          })
        })
      } else if (extensionToPolyDataIO.has(extension)) {
        return readPolyDataFile(null, file)
          .then(({ polyData, webWorker }) => {
            webWorker.terminate()
            const is3D = true
            return Promise.resolve({ is3D, data: vtk(polyData) })
          })
          .catch(error => {
            return Promise.reject(error)
          })
      } else if (extensionToMeshIO.has(extension)) {
        let is3D = true
        const read0 = performance.now()
        let convert0 = null
        return readMeshFile(null, file)
          .then(({ mesh: itkMesh, webWorker }) => {
            const read1 = performance.now()
            const duration = Number(read1 - read0)
              .toFixed(1)
              .toString()
            console.log('Mesh reading took ' + duration + ' milliseconds.')
            webWorker.terminate()
            const pipelinePath = 'MeshToPolyData'
            const args = ['mesh.json', 'polyData.json']
            const desiredOutputs = [
              { path: args[1], type: IOTypes.vtkPolyData },
            ]
            const inputs = [
              { path: args[0], type: IOTypes.Mesh, data: itkMesh },
            ]
            is3D = itkMesh.meshType.dimension === 3
            convert0 = performance.now()
            return runPipelineBrowser(
              null,
              pipelinePath,
              args,
              desiredOutputs,
              inputs
            )
          })
          .then(function({ outputs, webWorker }) {
            const convert1 = performance.now()
            const duration = Number(convert1 - convert0)
              .toFixed(1)
              .toString()
            console.log('Mesh conversion took ' + duration + ' milliseconds.')
            webWorker.terminate()
            return Promise.resolve({ is3D, data: vtk(outputs[0].data) })
          })
          .catch(error => {
            return readImageFile(null, file)
              .then(({ image: itkImage, webWorker }) => {
                webWorker.terminate()
                is3D = itkImage.imageType.dimension === 3 && !use2D
                return Promise.resolve({ is3D, data: itkImage })
              })
              .catch(error => {
                return Promise.reject(error)
              })
          })
      }
      const { image: itkImage, webWorker } = await readImageFile(null, file)
      itkImage.name = file.name
      webWorker.terminate()
      const is3D = itkImage.imageType.dimension === 3 && !use2D
      return { is3D, data: itkImage }
    })
    const dataSets = await Promise.all(readers)
    const images = dataSets
      .filter(({ data }) => !!data && data.imageType !== undefined)
      .map(({ data }) => data)

    let labelImageNameData = null
    if (!!labelImageNames) {
      labelImageNameData = new Map(labelImageNames)
    }
    if (images.length > 0) {
      for (let index = 0; index < images.length; index++) {
        const componentType = images[index].imageType.componentType
        if (!!!labelImage) {
          // Only integer-based pixels considered for label maps
          if (
            componentType === FloatTypes.Float32 ||
            componentType === FloatTypes.Float64
          ) {
            if (!!!image) {
              image = images[index]
            }
            continue
          }
          const data = images[index].data
          const uniqueLabels = new Set(data).size
          // If there are more values than this, it will not be considered a
          // label map
          const maxLabelsInLabelImage = 64
          if (uniqueLabels <= maxLabelsInLabelImage) {
            labelImage = images[index]
          } else {
            image = images[index]
          }
        }
        if (!!!image) {
          image = images[index]
        }
      }
    }
    const geometries = dataSets
      .filter(({ data }) => {
        return (
          !!data &&
          data.isA !== undefined &&
          data.isA('vtkPolyData') &&
          !!(
            data.getPolys().getNumberOfValues() ||
            data.getLines().getNumberOfValues() ||
            data.getStrips().getNumberOfValues()
          )
        )
      })
      .map(({ data }) => data)
    const pointSets = dataSets
      .filter(({ data }) => {
        return (
          !!data &&
          data.isA !== undefined &&
          data.isA('vtkPolyData') &&
          !!!(
            data.getPolys().getNumberOfValues() ||
            data.getLines().getNumberOfValues() ||
            data.getStrips().getNumberOfValues()
          )
        )
      })
      .map(({ data }) => data)
    let any3D = !dataSets.map(({ is3D }) => is3D).every(is3D => !is3D)
    any3D = !!image ? any3D || image.imageType.dimension === 3 : any3D
    any3D = !!labelImage ? any3D || labelImage.imageType.dimension === 3 : any3D

    return {
      image,
      labelImage,
      labelImageNames: labelImageNameData,
      geometries,
      pointSets,
      use2D: use2D || !any3D,
    }
  }
}

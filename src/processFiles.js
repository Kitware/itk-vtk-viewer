import readImageFile from 'itk/readImageFile'
import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries'
import readMeshFile from 'itk/readMeshFile'
import readPolyDataFile from 'itk/readPolyDataFile'
import runPipelineBrowser from 'itk/runPipelineBrowser'
import IOTypes from 'itk/IOTypes'
import getFileExtension from 'itk/getFileExtension'
import extensionToMeshIO from 'itk/extensionToMeshIO'
import extensionToPolyDataIO from 'itk/extensionToPolyDataIO'
import vtk from 'vtk.js/Sources/vtk'
import vtkXMLPolyDataReader from 'vtk.js/Sources/IO/XML/XMLPolyDataReader'
import vtkXMLImageDataReader from 'vtk.js/Sources/IO/XML/XMLImageDataReader'
import PromiseFileReader from 'promise-file-reader'

import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

import UserInterface from './UserInterface'
import createViewer from './createViewer'

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

export const processFiles = async (container, { files, use2D }) => {
  UserInterface.emptyContainer(container)
  UserInterface.createLoadingProgress(container)
  const config = await readFiles({ files, use2D })
  return createViewer(container, config)
}

export const readFiles = ({ files, use2D }) => {
  let readDICOMSeries = readImageDICOMFileSeries
  if (files.length < 2) {
    readDICOMSeries = function() {
      return Promise.reject('Skip DICOM series read attempt')
    }
  }

  /* eslint-disable new-cap */
  return new Promise((resolve, reject) => {
    readDICOMSeries(files)
      .then(({ image: itkImage, webWorkerPool }) => {
        const imageData = vtkITKHelper.convertItkToVtkImage(itkImage)
        const is3D = itkImage.imageType.dimension === 3 && !use2D
        resolve({ image: imageData, use2D: !is3D })
      })
      .catch(error => {
        const readers = Array.from(files).map(file => {
          const extension = getFileExtension(file.name)
          if (extension === 'vti') {
            return PromiseFileReader.readAsArrayBuffer(file).then(
              fileContents => {
                const vtiReader = vtkXMLImageDataReader.newInstance()
                vtiReader.parseAsArrayBuffer(fileContents)
                return Promise.resolve({
                  is3D: true,
                  data: vtiReader.getOutputData(0),
                })
              }
            )
          } else if (extensionToPolyDataIO.has(extension)) {
            return readPolyDataFile(null, file)
              .then(({ polyData, webWorker }) => {
                webWorker.terminate()
                const is3D = true
                return Promise.resolve({ is3D, data: vtk(polyData) })
              })
              .catch(error => {
                reject(error)
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
                console.log(
                  'Mesh conversion took ' + duration + ' milliseconds.'
                )
                webWorker.terminate()
                return Promise.resolve({ is3D, data: vtk(outputs[0].data) })
              })
              .catch(error => {
                return readImageFile(null, file)
                  .then(({ image: itkImage, webWorker }) => {
                    webWorker.terminate()
                    is3D = itkImage.imageType.dimension === 3 && !use2D
                    const imageData = vtkITKHelper.convertItkToVtkImage(
                      itkImage
                    )
                    return Promise.resolve({ is3D, data: imageData })
                  })
                  .catch(error => {
                    reject(error)
                  })
              })
          }
          return readImageFile(null, file)
            .then(({ image: itkImage, webWorker }) => {
              webWorker.terminate()
              const is3D = itkImage.imageType.dimension === 3 && !use2D
              const imageData = vtkITKHelper.convertItkToVtkImage(itkImage)
              console.log('Resolving image data promise (readImageFile)')
              return Promise.resolve({ is3D, data: imageData })
            })
            .catch(error => {
              reject(error)
            })
        })
        Promise.all(readers).then(dataSets => {
          const images = dataSets
            .filter(({ data }) => !!data && data.isA('vtkImageData'))
            .map(({ data }) => data)
          let image = null
          let labelMap = null
          if (images.length > 0) {
            for (let index = 0; index < images.length; index++) {
              const dataArray = images[index].getPointData().getScalars()
              const dataType = dataArray.getDataType()
              // Only integer-based pixels considered for label maps
              if (dataType === 'Float32Array' || dataType === 'Float64Array') {
                image = images[index]
                continue
              }
              const data = dataArray.getData()
              const uniqueLabels = new Set(data).size
              // If there are more values than this, it will not be considered a
              // label map
              const maxLabelsInLabelMap = 64
              if (uniqueLabels <= maxLabelsInLabelMap) {
                labelMap = images[index]
              } else {
                image = images[index]
              }
            }
          }
          const geometries = dataSets
            .filter(({ data }) => {
              return (
                !!data &&
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
                data.isA('vtkPolyData') &&
                !!!(
                  data.getPolys().getNumberOfValues() ||
                  data.getLines().getNumberOfValues() ||
                  data.getStrips().getNumberOfValues()
                )
              )
            })
            .map(({ data }) => data)
          const any3D = !dataSets.map(({ is3D }) => is3D).every(is3D => !is3D)
          const is3D = any3D && !use2D
          resolve({ image, labelMap, geometries, pointSets, use2D: !is3D })
        })
      })
  })
}

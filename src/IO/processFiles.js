import {
  extensionToMeshIO,
  readImageFile,
  readImageDICOMFileSeries,
  readMeshFile,
  FloatTypes,
  getFileExtension,
  meshToPolyData,
} from 'itk-wasm'
import vtk from 'vtk.js/Sources/vtk'
import vtkXMLPolyDataReader from 'vtk.js/Sources/IO/XML/XMLPolyDataReader'
import vtkXMLImageDataReader from 'vtk.js/Sources/IO/XML/XMLImageDataReader'
import PromiseFileReader from 'promise-file-reader'

import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

import UserInterface from '../UserInterface'
import createViewer from '../createViewer'

const MAX_LABELS_IN_LABEL_IMAGE = 64

const readDataFromFiles = async files => {
  const readers = Array.from(files).map(async file => {
    const extension = getFileExtension(file.name)
    if (extension === 'vti') {
      return PromiseFileReader.readAsArrayBuffer(file).then(fileContents => {
        const vtiReader = vtkXMLImageDataReader.newInstance()
        vtiReader.parseAsArrayBuffer(fileContents)
        const vtkImage = vtiReader.getOutputData(0)
        const itkImage = vtkITKHelper.convertVtkToItkImage(vtkImage)
        return Promise.resolve({
          is3D: true,
          data: itkImage,
        })
      })
    } else if (extension === 'vtp') {
      return PromiseFileReader.readAsArrayBuffer(file).then(fileContents => {
        const vtpReader = vtkXMLPolyDataReader.newInstance()
        vtpReader.parseAsArrayBuffer(fileContents)
        const polyData = vtpReader.getOutputData(0)
        return Promise.resolve({
          is3D: true,
          data: polyData,
        })
      })
    } else if (extensionToMeshIO.has(extension)) {
      let is3D = true
      try {
        const read0 = performance.now()
        const { mesh: itkMesh, webWorker } = await readMeshFile(null, file)
        const read1 = performance.now()
        const duration = Number(read1 - read0)
          .toFixed(1)
          .toString()
        const { polyData: itkPolyData } = await meshToPolyData(
          webWorker,
          itkMesh
        )
        console.log('Mesh reading took ' + duration + ' milliseconds.')
        webWorker.terminate()
        const polyData = vtkITKHelper.convertItkToVtkPolyData(itkPolyData)
        return { is3D, data: vtk(polyData) }
      } catch (error) {
        return readImageFile(null, file)
          .then(({ image: itkImage, webWorker }) => {
            webWorker.terminate()
            is3D = itkImage.imageType.dimension === 3
            return Promise.resolve({ is3D, data: itkImage })
          })
          .catch(error => {
            return Promise.reject(error)
          })
      }
    }
    const { image: itkImage, webWorker } = await readImageFile(null, file)
    itkImage.name = file.name
    webWorker.terminate()
    const is3D = itkImage.imageType.dimension === 3
    return { is3D, data: itkImage }
  })
  return await Promise.all(readers)
}

export const processFiles = async (
  container,
  { files, image, labelImage, config, labelImageNames, rotate, use2D, ...rest }
) => {
  UserInterface.emptyContainer(container)
  UserInterface.createLoadingProgress(container)
  const viewerConfig = await readFiles({
    files,
    image,
    labelImage,
    labelImageNames,
    use2D,
  })
  return createViewer(container, {
    ...viewerConfig,
    config,
    rotate,
    ...rest,
  })
}

export const readFiles = async ({
  files,
  image,
  labelImage,
  labelImageNames,
  use2D,
}) => {
  let readDICOMSeries = readImageDICOMFileSeries
  if (files.length < 2 || !image) {
    readDICOMSeries = function() {
      return Promise.reject('Skip DICOM series read attempt')
    }
  }
  try {
    const { image: itkImage, webWorkerPool } = await readDICOMSeries(files)
    webWorkerPool.terminateWorkers()
    itkImage.name = files[0].name
    const is3D = itkImage.imageType.dimension === 3 && !use2D
    return {
      image: itkImage,
      labelImage,
      use2D: !is3D,
    }
  } catch (error) {
    const dataSets = await readDataFromFiles(files)
    let imagesFromFiles = dataSets
      .map(({ data }) => data)
      .filter(data => !!data && data.imageType !== undefined)

    // find labelImage
    const labelImageResult =
      labelImage ??
      imagesFromFiles.find(image => {
        // Only integer-based pixels considered for label maps
        const { componentType } = image.imageType
        if (
          componentType !== FloatTypes.Float32 &&
          componentType !== FloatTypes.Float64
        ) {
          // If there are more values than this, it will not be considered a
          // label map
          const uniqueLabels = new Set(image.data).size
          if (uniqueLabels <= MAX_LABELS_IN_LABEL_IMAGE) return image
        }
      })

    imagesFromFiles = imagesFromFiles.filter(
      image => image !== labelImageResult
    )

    const labelImageNameData = labelImageNames ? new Map(labelImageNames) : null

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
          !(
            data.getPolys().getNumberOfValues() ||
            data.getLines().getNumberOfValues() ||
            data.getStrips().getNumberOfValues()
          )
        )
      })
      .map(({ data }) => data)

    const outImage = image ?? imagesFromFiles[0]

    const any3D = [
      ...dataSets.map(({ is3D }) => is3D),
      ...[outImage, labelImageResult].map(
        image => image?.imageType.dimension === 3
      ),
    ].some(is3D => is3D)

    return {
      image: outImage,
      labelImage: labelImageResult,
      labelImageNames: labelImageNameData,
      geometries,
      pointSets,
      use2D: use2D || !any3D,
    }
  }
}

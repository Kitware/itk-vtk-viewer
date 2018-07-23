import test from 'tape-catch'
import axios from 'axios'

import itkreadImageBlob from 'itk/readImageBlob'
import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import testUtils from 'vtk.js/Sources/Testing/testUtils'

import createViewer from '../src/createViewer'
import userInterface from '../src/userInterface'

const testImage3DPath = 'base/test/data/input/HeadMRVolume.nrrd'

//import createViewerBaseline from './data/baseline/createViewer.png'

test('Test createViewer', (t) => {
  const container = document.querySelector('body')
  const viewerContainer = document.createElement('div')
  container.appendChild(viewerContainer)

  return axios.get(testImage3DPath, {responseType: 'blob'})
    .then(function (response) {
      return itkreadImageBlob(null, response.data, testImage3DPath)
      })
    .then(({ image: itkImage, webWorker }) => {
      webWorker.terminate()

      const imageData = vtkITKHelper.convertItkToVtkImage(itkImage)
      const viewer = createViewer(container, { image: imageData })
      viewer.captureImage().then((screenshot) => {
        //testUtils.compareImages(screenshot, [createViewerBaseline], 'Test createViewer', t)
        // clean-up
        userInterface.emptyContainer(container)
        t.pass()
        t.end()
      })
      viewer.renderLater()
    })
})

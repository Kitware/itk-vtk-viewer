import test from 'tape-catch'
import axios from 'axios'

import itkreadImageBlob from 'itk/readImageBlob';

import createViewer from '../src/createViewer'
import userInterface from '../src/userInterface'

const testImage3DPath = 'base/test/data/HeadMRVolume.nrrd'

test('Test default createViewer', (t) => {
  const container = document.querySelector('body')
  const viewerContainer = document.createElement('div')
  container.appendChild(viewerContainer)

  return axios.get(testImage3DPath, {responseType: 'blob'})
    .then(function (response) {
      return itkreadImageBlob(null, response.data, testImage3DPath)
      })
    .then(({ image: itkImage, webWorker }) => {
      webWorker.terminate()
      console.log(itkImage)
      t.pass()
      // clean-up
      userInterface.emptyContainer(container);
      t.end()
    })



})

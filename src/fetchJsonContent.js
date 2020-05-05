import vtkHttpDataAccessHelper from 'vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper'

const fetchJsonContent = (url, progressCallback) =>
  vtkHttpDataAccessHelper.fetchJSON({}, url, { progressCallback })

export default fetchJsonContent

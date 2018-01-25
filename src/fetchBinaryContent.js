import vtkHttpDataAccessHelper from 'vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper';

const fetchBinaryContent = (url, progressCallback) =>
  vtkHttpDataAccessHelper.fetchBinary(url, { progressCallback });

export default fetchBinaryContent;

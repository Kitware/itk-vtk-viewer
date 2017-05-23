import vtkHttpDataAccessHelper from 'vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper';

function fetchZip(url) {
  return vtkHttpDataAccessHelper.fetchZipFile(url);
}

export default {
  fetchZip,
};

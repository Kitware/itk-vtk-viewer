import vtkHttpDataAccessHelper from 'vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper';

import viewer from './viewer';

function fetchZip(url) {
  return vtkHttpDataAccessHelper.fetchZipFile(url);
}

function processData(container, { file, ext }) {
  viewer.createViewer(container, {
    type: 'rawFile',
    file,
    ext,
  });
}

export default {
  fetchZip,
  processData,
};

import 'babel-polyfill';

import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract';

const userParams = vtkURLExtract.extractURLParameters();

console.log(userParams);

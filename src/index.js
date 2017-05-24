import 'babel-polyfill';

import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract';

import dataHandler from './dataHandler';
import helper from './helper';

const userParams = vtkURLExtract.extractURLParameters();
console.log(userParams);

helper.createFileDragAndDrop(null, dataHandler.processData);

import curry from 'curry'

import preventDefaults from './UserInterface/preventDefaults'
import processFiles from './processFiles'

/* Example usage:

import uploadIcon from 'itk-vtk-viewer/src/UserInterface/icons/upload.svg';
import getContrastSensitiveStyle from 'itk-vtk-viewer/src/UserInterface/getContrastSensitiveStyle';

const isBackgroundDark = false;

const contrastSensitiveStyle = getContrastSensitiveStyle(
  ['uploadButton'],
  isBackgroundDark
);

const uploadButton = document.createElement('div');
uploadButton.innerHTML = `<div class="${
  contrastSensitiveStyle.uploadButton
}">${uploadIcon}</div><input type="file" class="file" style="display: none;" multiple/>`;
const fileInput = uploadButton.querySelector('input');

fileInput.addEventListener('change', uploadFileHandler);
uploadButton.addEventListener('drop', uploadFileHandler);
uploadButton.addEventListener('click', (e) => fileInput.click());
uploadButton.addEventListener('dragover', preventDefaults);
mainUIRow.appendChild(uploadButton);

*/
const uploadFileHandler = curry(async function(container, event) {
  preventDefaults(event)
  const dataTransfer = event.dataTransfer
  const files = event.target.files || dataTransfer.files
  await processFiles(container, { files })
})
export default uploadFileHandler

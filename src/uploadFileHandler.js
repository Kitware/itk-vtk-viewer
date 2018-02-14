import curry from 'curry';

import preventDefaults from './userInterface/preventDefaults';
import processFiles from './processFiles';

const uploadFileHandler = curry(async function(container, event) {
  preventDefaults(event);
  const dataTransfer = event.dataTransfer;
  const files = event.target.files || dataTransfer.files;
  await processFiles(container, { files });
})
export default uploadFileHandler;

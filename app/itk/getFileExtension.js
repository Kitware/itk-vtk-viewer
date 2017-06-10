var getFileExtension = function getFileExtension(filePath) {
  return filePath.slice((filePath.lastIndexOf('.') - 1 >>> 0) + 2);
};

module.exports = getFileExtension;
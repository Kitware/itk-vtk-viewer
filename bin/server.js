var path = require('path');
var express = require('express');

function webServer(dataPath) {
  var app = express();
  var fullDataPath = dataPath;

  // Handle relative path
  if (fullDataPath[0] === '.') {
    fullDataPath = path.normalize(path.join(process.cwd(), dataPath));
  }

  app.use(express.static(path.join(__dirname, '/../dist')));
  app.use('/data', express.static(fullDataPath));

  return app;
}

module.exports = webServer;

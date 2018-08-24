#!/usr/bin/env node

let program = require('commander');
let ipList = require('./network');
let server = require('./server');
let pkg = require('../package.json');
let openFn = require('opn');
let path = require('path');

let app = null;
let version = /semantically-release/.test(pkg.version) ? 'development version' : pkg.version;
let dataPath = process.cwd();

function handlePort(value) {
  if (!isNaN(parseInt(value, 10))) {
    return parseInt(value, 10);
  }
  throw Error('port option requires a number');
}

program
  .version(version)
  .option('-p, --port [3000]', 'Start web server with given port', handlePort, 3000)
  .option('-s, --server-only', 'Do not open the web browser\n')
  .arguments('[inputFile]')
  .parse(process.argv);

const inputFilePath = program.args[0];
let urlOptions = '';
if (inputFilePath) {
  const fullPath = path.normalize(inputFilePath);
  dataPath = path.dirname(fullPath);
  const inputFileName = path.basename(fullPath);
  urlOptions = `?fileToLoad=/data/${inputFileName.replace(/ /g, '%20')}`
}

// Start server and listening
app = server(dataPath);
app.listen(program.port);

// Print server information
if (ipList.length === 1) {
  console.log(['\nitk-vtk-viewer\n  => Serving ', dataPath, '\n\n     http://', ipList[0].ip, ':', program.port, `/${urlOptions}\n`].join(''));
} else {
  function printIP(l) {
    console.log('    ', l.name, ['=> http://', l.ip, ':', program.port, `/${urlOptions}`].join(''));
  }
  console.log(['\nitk-vtk-viewer\n  => Serving ', dataPath, ' on port ', program.port, '\n'].join(''));
  ipList.forEach(printIP);
  console.log();
}

// Open browser if asked
if (!program.serverOnly) {
  openFn(['http://localhost:', program.port, `/${urlOptions}`].join(''));
}

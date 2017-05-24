#! /usr/bin/env node

var program = require('commander');
var ipList = require('./network');
var server = require('./server');
var pkg = require('../package.json');
var openFn = require('open');

var app = null;
var version = /semantically-release/.test(pkg.version) ? 'development version' : pkg.version;
var dataPath = process.cwd();

function handlePort(value) {
  if (!isNaN(parseInt(value, 10))) {
    return parseInt(value, 10);
  }
  throw Error('port option requires a number');
}

function printIP(l) {
  console.log('    ', l.name, ['=> http://', l.ip, ':', program.port, '/'].join(''));
}

program
  .version(version)
  .option('-p, --port [3000]', 'Start web server with given port', handlePort, 3000)
  .option('-d, --data [directory/http]', 'Data directory to serve')
  .option('-s, --server-only', 'Do not open the web browser')
  .parse(process.argv);

if (!process.argv.slice(2).length || !program.help) {
  program.outputHelp();
  process.exit();
}

if (program.data) {
  dataPath = program.data;
}

// Start server and listening
app = server(dataPath);
app.listen(program.port);

// Print server information
if (ipList.length === 1) {
  console.log(['\nItkVtkImageViewer\n  => Serve ', dataPath, '\n  |  http://', ipList[0].ip, ':', program.port, '/\n'].join(''));
} else {
  console.log(['\nItkVtkImageViewer\n  => Serve ', dataPath, ' on port ', program.port, '\n'].join(''));
  ipList.forEach(printIP);
  console.log();
}

// Open browser if asked
if (!program.serverOnly) {
  openFn(['http://localhost:', program.port].join(''));
}

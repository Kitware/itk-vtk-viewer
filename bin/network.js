var os = require('os');

var ifaces = os.networkInterfaces();
var networkInterfaces = [];
var alias = 0;
var currentName = '';

function netInterface(iface) {
  if (iface.family !== 'IPv4' || iface.internal !== false) {
    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
    return;
  }

  if (alias >= 1) {
    // this single interface has multiple ipv4 addresses
    networkInterfaces.push({
      name: [currentName, alias].join(':'),
      ip: iface.address,
    });
  } else {
    // this interface has only one ipv4 adress
    networkInterfaces.push({
      name: currentName,
      ip: iface.address,
    });
  }
  ++alias;
}

function device(ifname) {
  alias = 0;
  currentName = ifname;
  ifaces[ifname].forEach(netInterface);
}

Object.keys(ifaces).forEach(device);

module.exports = networkInterfaces;

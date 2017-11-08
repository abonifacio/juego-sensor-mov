const SerialPort = require('serialport');

const portName = '\\\\.\\COM4';
var sp = new SerialPort(portName, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

sp.on('data',function(data){
    console.log(data.byteLength)
});
sp.on('error',console.log);

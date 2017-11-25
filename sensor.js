const SerialPort = require('serialport');
const conf = require('./conf');
const ByteLength = SerialPort.parsers.ByteLength;
const portName = '\\\\.\\COM4';


function create(onData){
    var sp = undefined;
    var error = false;

    function start(){
        if(sp){
            sp.resume();
        }else{
            sp = new SerialPort(portName, {
                baudRate: 9600,
                dataBits: 8,
                parity: 'none',
                stopBits: 1,
                flowControl: false
            });
            const parser = sp.pipe(new ByteLength({length: 4}));
            parser.on('data',function(data){

                const dato = parseInt(data);
                if(dato==0){
                    onData(null);
                }else{
                    onData((dato-conf.offset)*conf.coef);
                }
            });
            sp.on('error',console.log);
        }
    }

    function stop(){
        if(sp){
            sp.pause();
        }
    }


    return {
        stop:stop,
        start:start
    }
}

module.exports = create

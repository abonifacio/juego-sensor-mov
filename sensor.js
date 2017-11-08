const SerialPort = require('serialport');
const ByteLength = SerialPort.parsers.ByteLength;
const portName = '\\\\.\\COM4';


function create(onData){
    var sp = undefined;
    
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
                // onData((parseInt(data)-10)*20);
                const dato = parseInt(data);
                onData(dato*10);
                // console.log(dato);
                // console.log(data.toString('hex'));
                // console.log(parseFloat(data));
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


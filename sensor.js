
const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2]
var index = 0

function create(onData){

    var interval = undefined;

    var value = 0

    function start(){
        interval = setInterval(loop,30)
    }

    function stop(){
        if(interval){
            clearInterval(interval)
        }
    }

    function loop(){
        // onData(data[index])
        // index = (index + 1) % data.length
        onData(f(value))
        value = (value + 2) % 360
    }
    
    return {
        start: start,
        stop: stop
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function f(x){
    return 100*Math.sin(x*Math.PI/180);
}

module.exports = create
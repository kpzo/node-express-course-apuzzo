const EventEmitter = require('events');

const emitter0 = new EventEmitter();

setInterval(() => {
    emitter0.emit('hello', 'i hear you');
}, 3000);

emitter0.on('hello', (msg) => console.log(msg));
emitter0.on('hello', () => console.log('do you hear me?'));  
let Rabbit = require('../index.js');

Rabbit.run(function () {
  Rabbit.connect('amqp://docker.local:32771');
  
  Rabbit.sendTo('easy-rabbit-test', {hola: 'mundo'});

  Rabbit.getFrom('easy-rabbit-test', (json, msg) => {
    console.log(json);
    Rabbit.ack(msg);
  });
});

// var Future = require('fibers/future'), wait = Future.wait;
//
// // This function returns a future which resolves after a timeout. This
// // demonstrates manually resolving futures.
// function sleep(ms) {
//     var future = new Future;
//     setTimeout(function() {
//         future.return();
//     }, ms);
//     return future;
// }
//
// // You can create functions which automatically run in their own fiber and
// // return futures that resolve when the fiber returns (this probably sounds
// // confusing.. just play with it to understand).
// var calcTimerDelta = function(ms) {
//     var start = new Date;
//     sleep(ms).wait();
//     return new Date - start;
// }; // <-- important!
//
// // And futures also include node-friendly callbacks if you don't want to use
// // wait()
// Future.task(function () {
//   console.log(calcTimerDelta(2000));
// });
//
// console.log('Holaaaaa');

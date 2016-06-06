# Easy Rabbit

Get a basic RabbitMQ client easily!

## API
* Import

```
var Rabbit = require('easy-rabbit');
```

* Rabbit.connect

```
// Async method to connect to rabbit.

Rabbit.connect('amqp://url-to-rab.bit:5672');
```

* Rabbit.getFrom

```
// Method to receive messages from an specific queue

Rabbit.getFrom('TAIL_NAME', function (json, rawMsg) {

    doSomeStuff(json);

    Rabbit.ack(rawMsg);

});
```

* Rabbit.sendTo

```
// Method to send messages to a queue

Rabbit.sendTo('TAIL_NAME', json);
```

* Rabbit.close

```
// Method to close the connection

Rabbit.close();
```

* Rabbit.run

```
// Every command of Rabbit must be inside the run function.

Rabbit.run(function () {
  Rabbit.connect('amqp://url-to-rab.bit:5672');

  Rabbit.sendTo('TAIL_NAME', {hello: 'world'});

  Rabbit.getFrom('TAIL_NAME', function (json, rawMsg) {

      doSomeStuff(json);

      Rabbit.ack(rawMsg);

  });

  Rabbit.close();
});
```

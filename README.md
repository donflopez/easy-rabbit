# Easy Rabbit

Get a basic RabbitMQ client easily!

## API

* Rabbit.connect('amqp://url-to-rab.bit:5672');
* Rabbit.getFrom('TAIL_NAME', function (json, rawMsg) {
    doSomeStuff(json);

    Rabbit.ack(rawMsg);
  });
* Rabbit.sendTo('TAIL_NAME', json);

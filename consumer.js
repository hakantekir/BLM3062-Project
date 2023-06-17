const Kafka = require('kafkajs');

const kafka = new Kafka.Kafka ({
    clientId: 'my-app',
    brokers: ['localhost:29092']
});

const consumer = kafka.consumer({ groupId: 'my-group' });
consumer.connect();
consumer.subscribe({ topic: 'product'});

consumer.run({
    eachMessage: async ({ message }) => {
        console.log({
            value: message.value.toString(),
        });
    }
});
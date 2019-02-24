const amqp = require('amqplib');
const readline = require('readline');
const uuidv4 = require('uuid/v4');
const main = async () => {
  try {
    const myQueueName = uuidv4();
    const conn = await amqp.connect('amqp://localhost');
    const ch = await conn.createChannel();
    await ch.assertExchange('bus', 'fanout', { durable: true });
    await ch.assertQueue(myQueueName, { durable: false });
    await ch.bindQueue(myQueueName, 'bus', '');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on('line', (line) => {
      ch.publish('bus', '', Buffer.from(line));
    });
    ch.consume(myQueueName, (msg) => {
      const line = msg.content.toString();
      console.log(line);
      ch.ack(msg);
    });
  } catch (e) {
    console.error('Error: ', e.message, e.stack);
  }
};

main();

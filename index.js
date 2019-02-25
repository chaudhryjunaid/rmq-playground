const amqp = require('amqplib');
const readline = require('readline');
const _ = require('lodash');
const randname = require('./randname');
const utils = require('./rmq-utils');

const main = async () => {
  try {
    const currentUser = randname();
    const activeUsers = new Set();
    console.log('Welcome to RabbitMQ messaging!');
    console.log(`\nMy name is: ${currentUser}\n\n`);
    const conn = await amqp.connect('amqp://localhost');
    const ch = await conn.createChannel();

    await ch.assertExchange('channel', 'fanout', { durable: false });
    await ch.assertExchange('echo', 'direct', { durable: false });
    await ch.assertExchange('direct', 'topic', { durable: false });
    await ch.assertQueue(currentUser, { durable: false });
    await ch.bindQueue(currentUser, 'channel', '');
    await ch.bindQueue(currentUser, 'echo', currentUser);
    await ch.bindQueue(currentUser, 'direct', currentUser);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `${currentUser}> `,
    });
    rl.on('line', (_line) => {
      const line = _line.trim().replace(/\s+/, ' ');
      const userRegex = /@[A-Za-z\-_\d]+/g;
      const handles = line.match(userRegex);
      const data = {
        sender: currentUser,
        type: 'msg',
        msg: line,
      };
      _.each(handles, (handle) => {
        const user = handle.replace('@', '');
        if (['channel', 'echo'].includes(user)) {
          ch.publish(user, currentUser, utils.toBuffer(data));
        } else if (activeUsers.has(user)) {
          ch.publish('direct', user, utils.toBuffer(data));
        } else {
          console.log(`${user} is not registered!`);
        }
      });
    });
    ch.consume(currentUser, (msg) => {
      const data = utils.fromBuffer(msg.content);
      let replyData;
      switch (data.type) {
        case 'msg':
          console.log(`${data.sender}> ${data.msg}`);
          break;
        case 'request':
          switch (data.msg) {
            case 'ping':
              replyData = {
                sender: currentUser,
                type: 'reply',
                msg: 'pong',
              };
              ch.publish('channel', '', utils.toBuffer(replyData));
              break;
            default:
              break;
          }
          break;
        case 'reply':
          switch (data.msg) {
            case 'pong':
              activeUsers.add(data.sender);
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      ch.ack(msg);
    });
    const data = {
      sender: currentUser,
      type: 'request',
      msg: 'ping',
    };
    ch.publish('channel', '', utils.toBuffer(data));
  } catch (e) {
    console.error('Error: ', e.message, e.stack);
  }
};

main();

import events from 'events';
import { rabbitMQInstance } from '../bin/www';
import { Queues } from '../../shared/enums/queues';

const pubSub = new events();

pubSub.on('user_created', async (message: string) => {
  const queueName = Queues.SIGNUP;
  console.log('USER_CREATE_PUBSUB');
  await rabbitMQInstance.assertQueue(queueName);
  await rabbitMQInstance.sendToQueue(queueName, Buffer.from(message));
});
pubSub.on('user_login', async (message: string) => {
  const queueName = 'SIGNIN';
  console.log('USER_LOGIN_PUBSUB');
  await rabbitMQInstance.assertQueue(queueName);
  await rabbitMQInstance.sendToQueue(queueName, Buffer.from(message));
});
pubSub.on('user_flagged', async (message: string) => {
  const queueName = Queues['FLAGGED-SIGNIN'];
  console.log('USER_FLAGGED_LOGIN_PUBSUB');
  await rabbitMQInstance.assertQueue(queueName);
  await rabbitMQInstance.sendToQueue(queueName, Buffer.from(message));
});

export default pubSub;

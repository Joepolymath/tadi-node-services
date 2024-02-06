import events from 'events';
import { rabbitMQInstance } from '../bin/www';

const pubSub = new events();

pubSub.on('user_created', async (message: string) => {
  const queueName = 'USERS';
  console.log('USER_CREATE_PUBSUB');
  await rabbitMQInstance.assertQueue(queueName);
  await rabbitMQInstance.sendToQueue(queueName, Buffer.from(message));
});

export default pubSub;

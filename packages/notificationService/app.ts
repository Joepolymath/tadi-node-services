import { RABBITMQ_URI } from '../shared/configs/env.config';
import rabbitmq from './setup/rabbitmq';
import { Queues } from '../shared/enums/queues';

const rabbitMQConfig = {
  url: RABBITMQ_URI,
};

const queues = Object.values(Queues);

rabbitmq.connect(rabbitMQConfig).then((connRes) => {
  console.log('RABBITMQ CONNECTED IN NOTIFICATION APP');
  queues.forEach((queue) => {
    rabbitmq.assertQueue(<string>queue);
  });

  queues.forEach((queue) => {
    rabbitmq.consume(<string>queue);
  });
});

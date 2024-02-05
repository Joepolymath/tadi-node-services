import { connect, Connection, Channel } from 'amqplib';

interface RabbitMQConfig {
  url: string;
}

export async function connectRabbitMQ(
  config: RabbitMQConfig
): Promise<{ connection: Connection; channel: Channel }> {
  try {
    const connection = await connect(config.url);

    const channel = await connection.createChannel();

    console.log('Connected to RabbitMQ successfully.');

    return { connection, channel };
  } catch (error: any) {
    if (error.message)
      console.error('Error connecting to RabbitMQ:', error.message);
    throw error;
  }
}

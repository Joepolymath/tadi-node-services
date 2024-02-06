import { connect, Connection, Channel } from 'amqplib';
import logger from '../configs/logger.config';

interface RabbitMQConfig {
  url: string;
}

export default class RabbitMQ {
  private channel: Channel | null = null;
  private connection: Connection | null = null;
  private instance: RabbitMQ | null = null;

  constructor(config: RabbitMQConfig) {
    if (!this.instance) {
      this.connect(config);
    }
  }

  public getInstance(config: RabbitMQConfig) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new RabbitMQ(config);
    return this.instance;
  }

  public async connect(
    config: RabbitMQConfig
  ): Promise<{ connection: Connection; channel: Channel }> {
    try {
      this.connection = await connect(config.url);

      this.channel = await this.connection.createChannel();

      logger.info('Connected to RabbitMQ successfully.');

      return { connection: this.connection, channel: this.channel };
    } catch (error: any) {
      if (error.message)
        console.error('Error connecting to RabbitMQ:', error.message);
      throw error;
    }
  }

  public getChannel() {
    return this.channel;
  }

  public assertQueue(queue: string) {
    this.channel?.assertQueue(queue, {
      durable: false,
    });
  }

  public sendToQueue(queue: string, message: Buffer) {
    this.channel?.sendToQueue(queue, message);
    logger.info('Message sent to queue');
  }
}

// export async function connectRabbitMQ(
//   config: RabbitMQConfig
// ): Promise<{ connection: Connection; channel: Channel }> {
//   try {
//     const connection = await connect(config.url);

//     const channel = await connection.createChannel();

//     console.log('Connected to RabbitMQ successfully.');

//     return { connection, channel };
//   } catch (error: any) {
//     if (error.message)
//       console.error('Error connecting to RabbitMQ:', error.message);
//     throw error;
//   }
// }

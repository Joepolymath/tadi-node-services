import { connect, Connection, Channel } from 'amqplib';
import logger from '../configs/logger.config';
import { Queues } from '../../shared/enums/queues';
import EmailService from '../utils/email';
import { SENDGRIDAPIKEY } from '../../shared/configs/env.config';
import { EmailServices, IEmailMessage } from '../../shared/types/email.types';
import { flaggedSignInEmail, signInEmail } from '../services/signIn';
import { signUpEmail } from '../services/signup';

interface RabbitMQConfig {
  url: string;
}

class RabbitMQ {
  private channel: Channel | null = null;
  private connection: Connection | null = null;
  private instance: RabbitMQ | null = null;

  constructor() {}

  public getInstance(config: RabbitMQConfig) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new RabbitMQ();
    return this.instance;
  }

  public async connect(
    config: RabbitMQConfig
  ): Promise<{ connection: Connection; channel: Channel }> {
    try {
      this.connection = await connect(config.url);
      // console.log({ connection: this.connection });

      this.channel = await this.connection.createChannel();
      // console.log({ channel: this.channel });

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

  public async assertQueue(queue: string) {
    await this.channel?.assertQueue(queue, {
      durable: false,
    });
    logger.info('QUEUE ASSERTED');
  }

  public async consume(queue: string) {
    this.channel?.consume(queue, async (message) => {
      console.log({ message });
      if (message !== null) {
        const formattedMessage = message.content.toString();
        console.log('Message Received:', formattedMessage, 'QUEUE:', queue);
        const messageObj = JSON.parse(formattedMessage);
        //   Handle the messages here...
        switch (queue) {
          case Queues.SIGNIN:
            await signInEmail(messageObj);
            break;
          case Queues.SIGNUP:
            await signUpEmail(messageObj);
            break;
          case Queues['FLAGGED-SIGNIN']:
            await flaggedSignInEmail(messageObj);
            break;
          default:
            break;
        }
        this.channel?.ack(message);
        return formattedMessage;
      }
    });
  }

  public closeConn() {
    this.connection?.close();
  }
}

export default new RabbitMQ();

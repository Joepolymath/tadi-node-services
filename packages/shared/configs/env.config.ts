import dotenv from 'dotenv';
import { IEnv } from '../../shared/types/env.types';
dotenv.config();

declare var process: {
  env: any;
};

export const {
  PORT,
  DB_URI,
  NODE_ENV,
  API_KEY,
  BCRYPT_SALT,
  JWT_SECRET,
  NOTIFICATION_SERVICE_PORT,
  PROXY_PORT,
  USER_SERVICE_PORT,
  NOTIFICATION_SERVICE_URL,
  USER_SERVICE_URL,
  CHAT_SERVICE_URL,
  RABBITMQ_URI,
  SENDGRIDAPIKEY,
  MAILER_FROM_OPTION,
}: IEnv = process.env;

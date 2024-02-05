export interface IEnv {
  PORT: string;
  DB_URI: string;
  NODE_ENV: string;
  API_KEY: string;
  BCRYPT_SALT: string;
  SEND_CHAMP_API_KEY: string;
  SEND_CHAMP_URL: string;
  JWT_SECRET: string;
  NOTIFICATION_SERVICE_PORT: string;
  USER_SERVICE_PORT: string;
  PROXY_PORT: string;
  USER_SERVICE_URL: string;
  NOTIFICATION_SERVICE_URL: string;
  RABBITMQ_URI: string;
}

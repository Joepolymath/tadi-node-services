require('module-alias/register');
import http from 'http';
import debugLib from 'debug';
import 'module-alias';
import {
  RABBITMQ_URI,
  USER_SERVICE_PORT,
} from '../../shared/configs/env.config';
import logger from '../configs/logger.config';
import App from '../index';
// import AuthController from '../modules/auth/auth.controller';
import { connectDb } from '../setup/database';
import UserController from '../controllers/users.controllers';
// import { connectRabbitMQ } from '../setup/rabbitmq';
import RabbitMQ from '../setup/rabbitmq';
import { Channel, Connection } from 'amqplib';

const app = new App([new UserController()]);

const debug = debugLib('tadi-users:server');

const rabbitMQConfig = {
  url: RABBITMQ_URI,
};

let rabbitmq: {
  connection: Connection;
  channel: Channel;
};

connectDb();
export const rabbitMQInstance = new RabbitMQ(rabbitMQConfig);
// (async function () {
//   rabbitmq = await connectRabbitMQ(rabbitMQConfig);
// })();

// export const rabbitmqConnection = rabbitmq;

const server = http.createServer(app.app);
// Get port from environment and store in express
const port = normalizePort(USER_SERVICE_PORT);

app.app.set('port', port);

// Normalize a port into a number, string or false.
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
}

// Event listener for http server 'listening' event
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  debug(`Listening on ${bind}`);
}

function onError(error: { syscall: string; code: any }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  //   handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

server.listen(port, () => {
  logger.info(
    `Server actively eavesdropping 👂 👂 👂 👂 @port: ${USER_SERVICE_PORT}`
      .green.bold
  );
});

server.on('listening', onListening);
server.on('error', onError);

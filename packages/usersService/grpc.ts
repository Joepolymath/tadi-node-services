import { Server, ServerCredentials } from '@grpc/grpc-js';

const server = new Server();

server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
  server.start();
});

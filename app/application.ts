import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import routes from './routes';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({ logger: true });

function build() {
  server.register(routes);
  return server;
}

export default build;

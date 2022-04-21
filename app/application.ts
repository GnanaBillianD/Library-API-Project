import fastify, { FastifyInstance } from 'fastify';
import fastifyFileUpload from 'fastify-file-upload';
import fastifyMultipart from 'fastify-multipart';
import fastifySse from 'fastify-sse';
import { Server, IncomingMessage, ServerResponse } from 'http';
import routes from './routes';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({ logger: true });

function build() {
  server.register(fastifyMultipart);
  server.addContentTypeParser('multipart/form-data', (request, done) => {
    done(null, request);
  });
  server.register(fastifyFileUpload);
  server.register(fastifySse);
  server.register(routes);
  return server;
}

export default build;

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import policyPrivateRoutes from './policy.private.routes';
import privateRoutes from './private.routes';
import publicRoutes from './public.routes';
import renderError from './render-error';

function routes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.register(privateRoutes);
  fastify.register(policyPrivateRoutes);
  fastify.register(publicRoutes);
  fastify.setErrorHandler((error, req, reply) => {
    renderError(reply, error);
  });
  next();
}
export default routes;

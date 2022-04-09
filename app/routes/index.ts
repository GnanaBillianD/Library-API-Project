import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import privateRoutes from './private.routes';
import publicRoutes from './public.routes';

function routes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string},
  next: (err?: Error)=> void
){
    fastify.register(privateRoutes);
    fastify.register(publicRoutes);
    next();
}

export default routes;
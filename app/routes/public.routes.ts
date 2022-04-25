import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import passwordsPublicRoutes from './passwords/passwords-public-routes';
import sessionPublicRoutes from './sessions/session-public.routes';
import ssePublicRoutes from './sse/sse-private-routes';


function publicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: {prefix: string},
  next: (err?: Error) => void
){
    fastify.register(sessionPublicRoutes);
    fastify.register(passwordsPublicRoutes);
    fastify.register(ssePublicRoutes);
    next();
}
export default publicRoutes;

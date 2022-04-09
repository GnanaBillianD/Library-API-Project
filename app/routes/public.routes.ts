import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import sessionPublicRoutes from './sessions/session-public.routes';


function publicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: {prefix: string},
  next: (err?: Error) => void
){
    fastify.register(sessionPublicRoutes);
    next();
}
export default publicRoutes;

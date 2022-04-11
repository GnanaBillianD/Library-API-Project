import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import passwordsPublicRoutes from './passwords/password-public-routes';
import sessionPublicRoutes from './sessions/session-public.routes';


function publicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: {prefix: string},
  next: (err?: Error) => void
){
    fastify.register(sessionPublicRoutes);
    fastify.register(passwordsPublicRoutes)
    next();
}
export default publicRoutes;

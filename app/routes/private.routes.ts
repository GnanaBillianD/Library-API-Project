import userAuthenticate from '../hooks/user-authentication.hook';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import bookPrivateRoutes from './books';
import { UserInstance } from '../types';
import superAdminPrivateRoutes from './super-admins/super-admins-private-routes';
import sessionPrivateRoutes from './sessions/session-private.routes';

declare module 'fastify' {
  interface FastifyRequest {
    currentUser: UserInstance;
  }
}

function privateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error)=> void
){
  userAuthenticate(fastify);
    fastify.register(bookPrivateRoutes);
    fastify.register(superAdminPrivateRoutes);
    fastify.register(sessionPrivateRoutes);
    next();
}

export default privateRoutes;

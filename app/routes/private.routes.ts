import userAuthenticate from '../hooks/user-authentication.hook';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import bookPrivateRoutes from './books';
import { UserInstance } from '../types';
import superAdminPrivateRoutes from './super-admins/super-admins-private-routes';

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
    next();
}

export default privateRoutes;

import userAuthenticate from '../hooks/user-authentication.hook';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import bookPrivateRoutes from './books';
import { UserInstance } from '../types';
import superAdminPrivateRoutes from './super-admins/super-admins-private-routes';
import sessionPrivateRoutes from './sessions/session-private.routes';
import passwordsPrivateRoutes from './passwords/passwords-private-router';

declare module 'fastify' {
  interface FastifyRequest {
    currentUser: UserInstance;
  }
  interface FastifyReply {
    sse: (obj: any) => void;
  }
}

function privateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  userAuthenticate(fastify);
  fastify.register(bookPrivateRoutes);
  fastify.register(superAdminPrivateRoutes);
  fastify.register(sessionPrivateRoutes);
  fastify.register(passwordsPrivateRoutes);
  next();
}

export default privateRoutes;

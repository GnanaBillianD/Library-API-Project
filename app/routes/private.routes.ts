import userAuthenticate from '../hooks/user-authentication.hook';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import bookPrivateRoutes from './books';
import { UserInstance } from '../types';
import sessionPrivateRoutes from './sessions/session-private.routes';
import passwordsPrivateRoutes from './passwords/passwords-private-router';
import UserPrivateRoutes from './users/users-private-routes';

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
  fastify.register(UserPrivateRoutes);
  fastify.register(sessionPrivateRoutes);
  fastify.register(passwordsPrivateRoutes);
  next();
}

export default privateRoutes;

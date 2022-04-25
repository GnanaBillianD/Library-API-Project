import userAuthenticate from '../hooks/user-authentication.hook';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { UserInstance } from '../types';
import sessionPrivateRoutes from './sessions/session-private.routes';
import passwordsPrivateRoutes from './passwords/passwords-private-router';
import UserEditPrivateRoutes from './users/users-edit-privte.routes';

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
  fastify.register(sessionPrivateRoutes);
  fastify.register(passwordsPrivateRoutes);
  fastify.register(UserEditPrivateRoutes);
  next();
}

export default privateRoutes;

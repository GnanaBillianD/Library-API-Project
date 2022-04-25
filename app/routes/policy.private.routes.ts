import userAuthenticate from '../hooks/user-authentication.hook';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import bookPrivateRoutes from './books';
import { UserInstance } from '../types';
import UserPrivateRoutes from './users/users-private-routes';
import policyAuthenticate from '../hooks/policy-authentication.hook';

declare module 'fastify' {
  interface FastifyRequest {
    currentUser: UserInstance;
  }
  interface FastifyReply {
    sse: (obj: any) => void;
  }
}

function policyPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  userAuthenticate(fastify);
  policyAuthenticate(fastify);
  fastify.register(bookPrivateRoutes);
  fastify.register(UserPrivateRoutes);
  next();
}

export default policyPrivateRoutes;

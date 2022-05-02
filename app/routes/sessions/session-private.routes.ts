import { logout } from '../../controllers/v1/sessions.controller';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

function sessionPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.delete('/logout', logout);
  next();
}

export default sessionPrivateRoutes;

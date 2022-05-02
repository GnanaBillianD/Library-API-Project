import { changePassword } from '../../controllers/v1/passwords.controller';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import changePasswordRouterOpts from './passwords-change-password.router-option';

function passwordsPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: 'string' },
  next: (err?: Error) => void
) {
  fastify.post('/passwords/change', changePasswordRouterOpts, changePassword);
  next();
}

export default passwordsPrivateRoutes;

import { resetPassword, sendResetPasswordLink } from '../../controllers/v1/passwords.controller';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

function passwordsPublicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post('/passwords/send_reset_password_link', sendResetPasswordLink);
  fastify.post('/passwords/reset', resetPassword);
  next();
}
export default passwordsPublicRoutes;

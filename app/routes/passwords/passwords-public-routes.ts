import {
  resetPassword,
  sendResetPasswordLink
} from '../../controllers/v1/passwords.controller';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import sendResetPasswordRouterOpts from './passwords-reset.router-option';
import resetPasswordRouterOpts from './passwords-reset-password.router-option';

function passwordsPublicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post(
    '/passwords/send_reset_password_link',
    sendResetPasswordRouterOpts,
    sendResetPasswordLink
  );
  fastify.post('/passwords/reset', resetPasswordRouterOpts, resetPassword);
  next();
}
export default passwordsPublicRoutes;

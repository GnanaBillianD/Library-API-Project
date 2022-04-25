import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as UserController from '../../controllers/v1/users-controller';
import updateUserOpts from './users-update-route-options';

function UserEditPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.put('/users/:id', updateUserOpts, UserController.update);

  next();
}
export default UserEditPrivateRoutes;

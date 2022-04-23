import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as UserController from '../../controllers/v1/users-controller';
import createUserOpts from './users-create-route-options';
import destoryUserOpts from './users-destory-route-options';
import listUserOpts from './users-list-route.options';
import updateUserOpts from './users-update-route-options';
import viewUserOpts from './users-view-route-options';

function UserPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post('/users', createUserOpts,UserController.create);
  fastify.get('/users', listUserOpts,UserController.list);
  fastify.get('/users/:id', viewUserOpts,UserController.view);
  fastify.put('/users/:id', updateUserOpts,UserController.update);
  fastify.delete('/users/:id', destoryUserOpts,UserController.destory)
  next();
}
export default UserPrivateRoutes;

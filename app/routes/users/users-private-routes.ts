import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as UserController from '../../controllers/v1/users-controller';
import createUserOpts from './users-create-route-options';
import destoryUserOpts from './users-destory-route-options';
import listUserOpts from './users-list-route.options';
import updateUserOpts from './users-update-route-options';
import viewUserOpts from './users-view-route-options';
import canCreate from '../../authorization-handlers/users/user-create-router-prehandler';
import canList from '../../authorization-handlers/users/user-list-router-prehandler';
import canView from '../../authorization-handlers/users/user-view-router-prehandler';
import canDelete from '../../authorization-handlers/users/user-delete-router-prehandler';

function UserPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/users',
    schema: createUserOpts,
    preHandler: canCreate,
    handler: UserController.create
  });
  fastify.route({
    method: 'GET',
    url: '/users',
    schema: listUserOpts,
    preHandler: canList,
    handler: UserController.list
  });
  fastify.route({
    method: 'GET',
    url: '/users/:id',
    schema: viewUserOpts,
    preHandler: canView,
    handler: UserController.view
  });
  fastify.route({
    method: 'DELETE',
    url: '/users/:id',
    schema: destoryUserOpts,
    preHandler: canDelete,
    handler: UserController.destory
  });
  fastify.put('/users/:id', updateUserOpts, UserController.update);
  next();

  // fastify.post('/users', createUserOpts, UserController.create);
  // fastify.get('/users', listUserOpts, UserController.list);
  // fastify.get('/users/:id', viewUserOpts, UserController.view);
  // fastify.delete('/users/:id', destoryUserOpts, UserController.destory);
}
export default UserPrivateRoutes;

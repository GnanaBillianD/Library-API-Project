import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as SuperAdminController from '../../controllers/v1/super-admins-controller';
import destorySuperAdminOpts from './super-admin-destory-route-options';
import createSuperAdminOpts from './super-admins-create-route-options';
import listSuperAdminOpts from './super-admins-list-route.options';
import updateSuperAdminOpts from './super-admins-update-route-options';
import viewSuperAdminOpts from './super-admins-view-route-options';

function superAdminPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post('/users', createSuperAdminOpts,SuperAdminController.create);
  fastify.get('/users', listSuperAdminOpts,SuperAdminController.list);
  fastify.get('/users/:id', viewSuperAdminOpts,SuperAdminController.view);
  fastify.put('/users/:id', updateSuperAdminOpts,SuperAdminController.update);
  fastify.delete('/users/:id', destorySuperAdminOpts,SuperAdminController.destory)
  next();
}
export default superAdminPrivateRoutes;

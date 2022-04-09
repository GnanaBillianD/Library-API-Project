import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as SuperAdminController from '../../controllers/v1/super-admins-controller';
import viewBookOpts from '../books/book-view-route-options';
import destorySuperAdminOpts from './super-admin-destory-route-options';
import createSuperAdminOpts from './super-admins-create-route-options';
import listSuperAdminOpts from './super-admins-list-route.options';
import updateSuperAdminOpts from './super-admins-update-route-options';
import viewSuperAdminOpts from './super-admins-view-options';

function superAdminPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post('/super_admins', createSuperAdminOpts,SuperAdminController.create);
  fastify.get('/super_admins', listSuperAdminOpts,SuperAdminController.list);
  fastify.get('/super_admins/:id', viewSuperAdminOpts,SuperAdminController.view);
  fastify.put('/super_admins/:id', updateSuperAdminOpts,SuperAdminController.update);
  fastify.delete('/super_admins/:id', destorySuperAdminOpts,SuperAdminController.destory)
  next();
}
export default superAdminPrivateRoutes;

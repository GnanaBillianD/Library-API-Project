import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as BookController from '../../controllers/v1/books.controller';
import uploadBulkRouterOpts from './book-bulk-upload-router-options';
import canCreate from '../../prehandler/books/book-create-router-prehandler';
import createBookOpts from './book-create-route-options';
import destoryBookOpts from './book-destory-route-options';
import listBookOpts from './book-list-route-options';
import updatedBookOpts from './book-update-route-options';
import viewBookOpts from './book-view-route-options';
import canUpdate from '../../prehandler/books/book-update-router-prehandler';
import canDelete from '../../prehandler/books/book-delete-route-prehandler';
import canCreateBooks from '../../prehandler/books/book-bulk-upload-router-prehandler';

function bookPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.route({
    method: 'POST',
    url: '/books',
    schema: createBookOpts,
    preHandler: canCreate,
    handler: BookController.create
  });
  fastify.route({
    method: 'PUT',
    url: '/books/:id',
    schema: updatedBookOpts,
    preHandler: canUpdate,
    handler: BookController.update
  });
  fastify.route({
    method: 'DELETE',
    url: '/books/:id',
    schema: destoryBookOpts,
    preHandler: canDelete,
    handler: BookController.destory
  });
  fastify.route({
    method: 'POST',
    url: '/books/buk_upload',
    schema: uploadBulkRouterOpts,
    preHandler: canCreateBooks,
    handler: BookController.bulkupload
  });
  fastify.get('/books', listBookOpts, BookController.list);
  fastify.get('/books/:id', viewBookOpts, BookController.view);
  next();

  // fastify.post('/books', createBookOpts, BookController.create);
  // fastify.put('/books/:id', updatedBookOpts, BookController.update);
  // fastify.delete('/books/:id', destoryBookOpts, BookController.destory);
  // fastify.post(
  //   '/books/buk_upload',
  //   uploadBulkRouterOpts,
  //   BookController.bulkupload
  // );
}
export default bookPrivateRoutes;

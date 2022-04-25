import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as BookController from '../../controllers/v1/books.controller';
import uploadBulkRouterOpts from './book-bulk-upload-router-options';
import createBookOpts from './book-create-route-options';
import destoryBookOpts from './book-destory-route-options';
import listBookOpts from './book-list-route-options';
import updatedBookOpts from './book-update-route-options';
import viewBookOpts from './book-view-route-options';

function bookPrivateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post('/books', createBookOpts, BookController.create);
  fastify.put('/books/:id', updatedBookOpts, BookController.update);
  fastify.delete('/books/:id', destoryBookOpts, BookController.destory);
  fastify.post(
    '/books/buk_upload',
    uploadBulkRouterOpts,
    BookController.bulkupload
  );
  next();
}
export default bookPrivateRoutes;

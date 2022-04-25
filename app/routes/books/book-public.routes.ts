import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as BookController from '../../controllers/v1/books.controller';
import listBookOpts from './book-list-route-options';
import viewBookOpts from './book-view-route-options';

function bookPublicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.get('/books', listBookOpts, BookController.list);
  fastify.get('/books/:id', viewBookOpts, BookController.view);
  next();
}

export default bookPublicRoutes;

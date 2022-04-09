import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { BookCreationAttributes, BookInstance } from '../../types';
import * as BookServices from '../../services/book.service';

type createBody = { book: BookCreationAttributes };

function create(req: FastifyRequest, reply: FastifyReply) {
  const { body } = req;
  const params = body as createBody;
  BookServices.create(params.book)
    .then((result: BookInstance) => {
      reply.code(200).send(result);
    })
    .catch((error: FastifyError) => {
      reply.send({ errors: [error.message] });
    });
}

function list(req: FastifyRequest, reply: FastifyReply) {
  BookServices.list()
    .then((result: BookInstance) => {
      reply.code(200).send(result);
    })
    .catch((error: FastifyError) => {
      reply.send({ errors: [error.message] });
    });
}

function view (req: FastifyRequest, reply: FastifyReply){
    const { id } = req.params as { id: number };
    BookServices.getById(id)
    .then((result: BookInstance) => {
        reply.code(200).send(result);
    })
    .catch((error: FastifyError) => {
        reply.send({ errors: [error.message] });
    })
}

function update(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const { body } = req;
  const params = body as createBody;
  BookServices.update(id, params.book)
    .then((result: BookInstance) => {
      reply.code(200).send(result);
    })
    .catch((error: FastifyError) => {
      reply.send({ errors: [error.message] });
    });
}

function destory(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  BookServices.destoryById(id)
    .then(() => {
      reply.code(200).send({ message: 'successfully deleted' });
    })
    .catch((error: FastifyError) => {
      reply.send({ errors: [error.message] });
    });
}

export { create, list, update, view, destory };

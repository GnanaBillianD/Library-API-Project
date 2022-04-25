import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { BookCreationAttributes, BookInstance } from '../../types';
import * as BookServices from '../../services/book.service';
import UserPolicy from '../../policies/user.policy';
import { BookListQUeryParams } from '../../types/books.controller';

type createBody = { book: BookCreationAttributes };

function create(req: FastifyRequest, reply: FastifyReply) {
  const { currentUser, body } = req;
  const policy = new UserPolicy(currentUser);
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
  const query = req.query as BookListQUeryParams;
  BookServices.listAndPaginate(query)
    .then((result: BookInstance) => {
      reply.code(200).send(result);
    })
    .catch((error: FastifyError) => {
      reply.send({ errors: [error.message] });
    });
}

function view(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  BookServices.getById(id)
    .then((result: BookInstance) => {
      reply.code(200).send(result);
    })
    .catch((error: FastifyError) => {
      reply.send({ errors: [error.message] });
    });
}

function update(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const { body } = req;
  const policy = new UserPolicy(req.currentUser);
  const params = body as createBody;
  BookServices.update(id, params.book)
    .then((result: BookInstance) => {
      reply.code(200).send(result);
    })
    .catch((error: FastifyError) => {
      reply.send({ errors: [error.message] });
    });
}

async function bulkupload(req: FastifyRequest, reply: FastifyReply) {
  const attrs = await req.file();
  const policy = new UserPolicy(req.currentUser);
  BookServices.bookBulkUpload(attrs)
    .then(() => {
      reply.code(201).send({ message: 'Books created successfully' });
    })
    .catch((error: FastifyError) => {
      reply.code(422).send({ errors: [error.message] });
    });
}

function destory(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const policy = new UserPolicy(req.currentUser);
  BookServices.destoryById(id)
    .then(() => {
      reply.code(200).send({ message: 'successfully deleted' });
    })
    .catch((error: FastifyError) => {
      reply.send({ errors: [error.message] });
    });
}

export { create, list, update, view, destory, bulkupload };

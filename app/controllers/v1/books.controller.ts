import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { BookCreationAttributes, BookInstance } from '../../types';
import * as BookServices from '../../services/book.service';
import SuperAdminPolicy from '../../policies/super-admin.policy';
import { BookListQUeryParams } from '../../types/books.controller';
import { ValidationError } from 'sequelize';
import BulkUploadError from '../../exceptions/bulk-upload-error';

type createBody = { book: BookCreationAttributes };

function create(req: FastifyRequest, reply: FastifyReply) {
  const { currentUser, body } = req;
  const policy = new SuperAdminPolicy(currentUser);
  const params = body as createBody;
  if (policy.canView()) {
    BookServices.create(params.book)
      .then((result: BookInstance) => {
        reply.code(200).send(result);
      })
      .catch((error: FastifyError) => {
        reply.send({ errors: [error.message] });
      });
  } else {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
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
  const policy = new SuperAdminPolicy(req.currentUser);
  const params = body as createBody;
  if (policy.canUpdate()) {
    BookServices.update(id, params.book)
      .then((result: BookInstance) => {
        reply.code(200).send(result);
      })
      .catch((error: FastifyError) => {
        reply.send({ errors: [error.message] });
      });
  } else {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
}

async function bulkupload(req: FastifyRequest, reply: FastifyReply) {
  const attrs = await req.file();
  const policy = new SuperAdminPolicy(req.currentUser);
  if (policy.canCreateBooks()) {
    BookServices.bookBulkUpload(attrs)
      .then(() => {
        reply.code(201).send({ message: 'Books created successfully' });
      })
      .catch((error: FastifyError) => {
        reply.code(422).send({ errors: [error.message] });
      });
  } else {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
}

function destory(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const policy = new SuperAdminPolicy(req.currentUser);
  if (policy.canDelete()) {
    BookServices.destoryById(id)
      .then(() => {
        reply.code(200).send({ message: 'successfully deleted' });
      })
      .catch((error: FastifyError) => {
        reply.send({ errors: [error.message] });
      });
  } else {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
}

export { create, list, update, view, destory, bulkupload };

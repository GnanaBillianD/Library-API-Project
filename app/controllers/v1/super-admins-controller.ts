import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { UserInstance } from '../../types';
import * as superAdminService from '../../services/superAdmin.service';
import SuperAdminPolicy from '../../policies/super-admin.policy';
import {
  CreateSuperAdminsParams,
  UpdateSuperAdminsParams
} from '../../types/super-admins.controller';

type CreateSuperAdminBody = { super_admin: CreateSuperAdminsParams };
type UpdateSuperAdminBody = { super_admin: UpdateSuperAdminsParams };

function create(req: FastifyRequest, reply: FastifyReply) {
  const { currentUser, body } = req;
  const policy = new SuperAdminPolicy(currentUser);
  const params = body as CreateSuperAdminBody;
  if (policy.canCreate()) {
    superAdminService
      .create(params)
      .then((result) => {
        reply.code(200).send({ message: 'successfully created'});
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
  const policy = new SuperAdminPolicy(req.currentUser);
  if (policy.canList()) {
    superAdminService
      .list()
      .then((result: UserInstance) => {
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

function view(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const policy = new SuperAdminPolicy(req.currentUser);
  if (policy.canView()) {
    superAdminService
      .getById(id)
      .then((result: UserInstance) => {
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

function update(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const { currentUser, body } = req;
  const policy = new SuperAdminPolicy(currentUser);
  const params = body as CreateSuperAdminBody;  
  if (policy.canUpdate()) {
    superAdminService
      .update(id, params)
      .then((result: UserInstance) => {
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

function destory(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const policy = new SuperAdminPolicy(req.currentUser);
  if (policy.canDelete()) {
    superAdminService
      .destoryById(id)
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

export { create, list, update, view, destory };

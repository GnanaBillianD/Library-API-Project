import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { UserInstance } from '../../types';
import {
  create as userCreate,
  list as usersList,
  getById as userDetails,
  update as userUpdate,
  destoryById
} from '../../services/users.service';
import UserPolicy from '../../policies/user.policy';
import {
  CreateUsersParams,
  UpdateUsersParams
} from '../../types/users-controller';

type CreateUsersBody = { super_admin: CreateUsersParams };
type UpdateUsersBoday = { super_admin: UpdateUsersParams };

function create(req: FastifyRequest, reply: FastifyReply) {
  const { currentUser, body } = req;
  const policy = new UserPolicy(currentUser);
  const params = body as CreateUsersBody;   
  if (policy.canCreate()) {
    userCreate(params)
      .then(() => {
        reply.code(200).send({ message: 'successfully created' });
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

function list(req: FastifyRequest, reply: FastifyReply) {
  const policy = new UserPolicy(req.currentUser);
  if (policy.canList()) {
    usersList()
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
  const policy = new UserPolicy(req.currentUser);
  if (policy.canView()) {
    userDetails(id)
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
  const policy = new UserPolicy(currentUser);
  const params = body as UpdateUsersBoday;
  if (policy.canUpdate()) {
    userUpdate(id, params)
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
  const policy = new UserPolicy(req.currentUser);
  if (policy.canDelete()) {
    destoryById(id)
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

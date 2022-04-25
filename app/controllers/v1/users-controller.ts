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
  userCreate(params)
    .then(() => {
      reply.code(200).send({ message: 'successfully created' });
    })
    .catch((error: FastifyError) => {
      reply.code(422).send({ errors: [error.message] });
    });
}

function list(req: FastifyRequest, reply: FastifyReply) {
  const policy = new UserPolicy(req.currentUser);
  usersList()
    .then((result: UserInstance) => {
      reply.code(200).send(result);
    })
    .catch((error: FastifyError) => {
      reply.send({ errors: [error.message] });
    });
}

function view(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const policy = new UserPolicy(req.currentUser);
  userDetails(id)
    .then((result: UserInstance) => {
      reply.code(200).send(result);
    })
    .catch((error: FastifyError) => {
      reply.send({ errors: [error.message] });
    });
}

function update(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const { currentUser, body } = req;
  const policy = new UserPolicy(currentUser);
  const params = body as UpdateUsersBoday;
  userUpdate(id, params)
    .then((result: UserInstance) => {
      reply.code(200).send(result);
    })
    .catch((error: FastifyError) => {
      reply.send({ errors: [error.message] });
    });
}

function destory(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const policy = new UserPolicy(req.currentUser);
  destoryById(id)
    .then(() => {
      reply.code(200).send({ message: 'successfully deleted' });
    })
    .catch((error: FastifyError) => {
      reply.send({ errors: [error.message] });
    });
}

export { create, list, update, view, destory };

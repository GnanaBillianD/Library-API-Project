import { LoginBodyParams } from '../../types/session.controller';
import { FastifyReply, FastifyRequest } from 'fastify';
import signin from '../../services/session.service';

function login(req: FastifyRequest, reply: FastifyReply) {
  const { email, password } = req.body as LoginBodyParams;
  return signin({ email, password })
    .then((accessToken) => {
      reply.header('Authorization', `Bearer ${accessToken}`);
      reply.code(200).send({ message: 'Login successfully' });
    })
    .catch((error) => {
      reply.send({ errors: [error.message] });
    });
}

export { login };

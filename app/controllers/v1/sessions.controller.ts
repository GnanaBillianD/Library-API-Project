import { LoginBodyParams } from '../../types/session.controller';
import { FastifyReply, FastifyRequest } from 'fastify';
import { signin, markLogout } from '../../services/session.service';

function login(req: FastifyRequest, reply: FastifyReply) {
  const { email, password } = req.body as LoginBodyParams;
  signin({ email, password })
    .then((accessToken) => {
      reply.header('Authorization', `Bearer ${accessToken}`);
      reply.code(200).send({ message: 'Login successfully' });
    })
    .catch(() => {
      reply.code(400).send({ message: 'Invalid password or email' });
    });
}

function logout(req: FastifyRequest, reply: FastifyReply) {
  markLogout(req.currentUser)
    .then(() => {
      reply.header('Authorization', null);
      reply.code(200).send({ message: 'Successfully logged out' });
    })
    .catch((error) => {
      reply.send({ errors: [error.message] });
    });
}

export { login, logout };

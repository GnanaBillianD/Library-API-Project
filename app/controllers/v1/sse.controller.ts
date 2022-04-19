import SSEPolicy from '../../routes/sse/sse.policy';
import { FastifyReply, FastifyRequest } from 'fastify';

function connect(req: FastifyRequest, reply: FastifyReply) {
  const policy = new SSEPolicy(req.currentUser);
  if (policy.canConnect()) {
    handleConnection(req, reply);
  } else {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
}

export { connect };

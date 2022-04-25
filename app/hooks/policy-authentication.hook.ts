import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const policyAuthenticate = (fastify: FastifyInstance) => {
  fastify.addHook(
    'preHandler',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const user = req.currentUser;
      if (!user.isSuperAdmin()) {
        const error = {
          errors: ['You are not allowed to perform this action']
        };
        reply.code(401).send(error);
      }
    }
  );
};

export default policyAuthenticate;

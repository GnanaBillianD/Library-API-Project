import logger from '../config/logger';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import models from '../models';
import { JwtTokenUserAttributes } from '../types/session.controller';
import { verify as jwtVerify } from 'jsonwebtoken';

const { User } = models;
const { JWT_SECRET_KEY = '' } = process.env;

function getAuthToken(query: any) {
  console.log("q------------",query)
  const token  = JSON.parse(JSON.stringify(query.q));
  return token;
}

function verifyToken(
  token: string,
  secretKey: string
): Promise<JwtTokenUserAttributes> {
  return new Promise((resolve, reject) =>
    jwtVerify(
      token,
      secretKey,
      (err: string, decoded: JwtTokenUserAttributes) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    )
  );
}

const sseAuthenticate = (fastify: FastifyInstance) => {
  fastify.decorateRequest('currentUser', null);
  fastify.addHook(
    'preHandler',
    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log("request-----------",request.query)
      const token = getAuthToken(request.query);
      console.log("token--------",token);
      
      if (!token) {
        const error = {
          errors: ['You need to sign-in to access this page']
        };
        reply.code(401).send(error);
      } else {
        try {
          const userAttrs = await verifyToken(token, JWT_SECRET_KEY);
          console.log("userAttrs--------",userAttrs)
          const user = await User.findOne({
            where: { email: userAttrs.email }
          });
          if (user && user.access_token === token) {
            request.currentUser = user;
            reply.header('Authorization', `Bearer ${token}`);
          } else {
            reply.code(401).send({ errors: ['Session has expired'] });
          }
        } catch (error: any) {
          logger.error({ err: error }, error.toString());
          reply.code(401).send({ errors: ['Session has expired'] });
        }
      }
    }
  );
};
export default sseAuthenticate;

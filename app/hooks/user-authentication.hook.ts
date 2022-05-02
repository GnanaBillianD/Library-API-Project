import models from '../models';
import { JwtTokenUserAttributes } from '../types/session.controller';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { verify as jwtVerify } from 'jsonwebtoken';

const { User } = models;
const { JWT_SECRET_KEY = '' } = process.env;

function getHeaderToken(headers: any) {
  const bearerHeader = headers.authorization;
  const bearer = bearerHeader ? bearerHeader.split(' ') : [];
  const bearerToken = bearer[1];
  return bearerToken;
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

const userAuthenticate = (fastify: FastifyInstance) => {
  fastify.decorateRequest('currentUser', null);
  fastify.addHook(
    'preHandler',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const token = getHeaderToken(request.headers);
      if (!token) {
        const error = {
          errors: ['You need to sign-in to access this page']
        };
        reply.code(401).send(error);
      } else {
        try {
          const userAttrs = await verifyToken(token, JWT_SECRET_KEY);
          // console.log("-------------userAttrs--------------",userAttrs)
          const user = await User.findOne({
            where: { email: userAttrs.email }
          });
          // console.log("user---------------",user.access_token);
          // console.log("token-----------------", token)

          if (user && user.access_token == token) {
            request.currentUser = user;
            reply.header('Authorization', `Bearer ${token}`);
          } else {
            reply.code(401).send({ errors: ['Session has expired'] });
          }
        } catch (error: any) {
          reply.code(401).send({ errors: ['access denied'] });
        }
      }
    }
  );
};
export default userAuthenticate;

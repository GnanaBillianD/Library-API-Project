import {
  sendResetPasswordInstruction,
  verifyAndChangePassword,
  verifyAndResetPassword
} from '../../services/password.service';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import {
  ResetPasswordParams,
  ChangePasswordParams
} from '../../types/passwords-controller';
import { ValidationError } from 'sequelize';

function sendResetPasswordLink(req: FastifyRequest, reply: FastifyReply) {
  const { email } = req.body as { email: string };
  sendResetPasswordInstruction(email)
    .then(() => {
      reply.code(200).send({
        message:
          'Reset password instructions have been sent to your email account'
      });
    })
    .catch(() => {
      reply.code(200).send({
        message:
          'Reset password instructions have been sent to your email account'
      });
    });
}

function resetPassword(req: FastifyRequest, reply: FastifyReply) {
  const params = req.body as ResetPasswordParams;
  const token = req.headers.authorization || '';
  // console.log("header===========>", token)
  verifyAndResetPassword(token, params)
    .then((user) => {
      reply.code(200).send(user);
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

function changePassword(req: FastifyRequest, reply: FastifyReply) {
  const currentUser = req.currentUser;
  const params = req.body as ChangePasswordParams;
  verifyAndChangePassword(params, currentUser)
    .then((user) => {
      reply.code(200).send(user);
    })
    .catch((error: FastifyError) => {
      if (error instanceof ValidationError) {
        reply.send(error);
      } else {
        reply.code(422).send({ errors: [error.message] });
      }
    });
}

export { sendResetPasswordLink, resetPassword, changePassword };

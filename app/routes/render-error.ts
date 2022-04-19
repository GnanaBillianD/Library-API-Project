import logger from '../config/logger';
import { FastifyError, FastifyReply } from 'fastify';
import { map } from 'lodash';
import {
  AssociationError,
  DatabaseError,
  EmptyResultError,
  UniqueConstraintError,
  ValidationError
} from 'sequelize';
import { SessionError } from '../exceptions';

function renderError(reply: FastifyReply, errObj: FastifyError) {
  logger.error({ err: errObj }, errObj.toString());
  if (errObj.validation) {
    const messages = map(errObj.validation, (err: any) => err.message);
    reply.code(400).send({ error: messages });
  } else if (errObj instanceof DatabaseError) {
    const message = errObj.message || errObj.original;
    reply.code(400).send({ errors: [message] });
  } else if (errObj instanceof SessionError) {
    reply.code(401).send({ errors: [errObj.message] });
  } else if (errObj instanceof EmptyResultError) {
    reply.code(404).send({ errors: [errObj.message] });
  } else if (
    errObj instanceof ValidationError ||
    errObj instanceof UniqueConstraintError
  ) {
    const messages = map(errObj.errors, (error: any) => error.message);
    reply.code(422).send({ errors: messages });
  } else if (errObj instanceof AssociationError) {
    reply.code(422).send({ errors: [errObj.message] });
  } else if (
    errObj.statusCode &&
    errObj.statusCode >= 400 &&
    errObj.statusCode <= 499
  ) {
    reply.code(errObj.statusCode).send({ errors: [errObj.message] });
  } else {
    reply.code(500).send({
      errors: ['Sorry, something went wrong on our end. Please try again later']
    });
  }
}
export default renderError;

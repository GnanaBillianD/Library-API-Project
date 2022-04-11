import models from '../models';
import { UserInstance } from '../types';
import { sign as jwtSignin } from 'jsonwebtoken';
import { sendResetPasswordLink } from './mailer.service';
import { ResetPasswordParams } from '../types/passwords-controller';
import { decryptUserAttrsFromInvitationToken } from './session.service';
import { TOKEN_TYPE } from '../config/constants';

const { User } = models;

function getUserByEmail(email: string) {
  return User.findOne({ where: { email } }).then(
    (user: UserInstance | null) => {
      if (user) {
        return user;
      }
      throw new Error('User not found');
    }
  );
}

async function sendResetPasswordInstruction(email: string) {
  const user = await getUserByEmail(email);
  const { JWT_SECRET_KEY = '' } = process.env;
  const { id } = user;
  const token = jwtSignin({ id, email }, JWT_SECRET_KEY, {
    expiresIn: 6000
  });
  sendResetPasswordLink(user, token);
}

async function verifyAndResetPassword(
  resetToken: string,
  passwordParams: ResetPasswordParams
) {
  const userAttrs = await decryptUserAttrsFromInvitationToken(
    resetToken,
    TOKEN_TYPE.resetPassword
  );
  const user = await getUserByEmail(userAttrs.email);
  const confirmedAt = user.confirmed_at || new Date();
  const updateAttrs = {
    ...passwordParams,
    access_token: null,
    confirmed_at: confirmedAt
  };
  return await user.update(updateAttrs);
}

export { sendResetPasswordInstruction, verifyAndResetPassword };

import models from '../models';
import { UserInstance } from '../types';
import { sign as jwtSignin } from 'jsonwebtoken';
import { sendResetPasswordLink } from './mailer.service';
import {
  ChangePasswordParams,
  ResetPasswordParams
} from '../types/passwords-controller';
import bcrypt from 'bcrypt';
import { TOKEN_TYPE } from '../config/constants';
import { verifyToken } from './session.service';

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
  const token = jwtSignin(
    { id, email, type: TOKEN_TYPE.resetPassword },
    JWT_SECRET_KEY,
    {
      expiresIn: 6000
    }
  );
  sendResetPasswordLink(user, token);
}

async function decryptUserAttrsFromInvitationToken(invitationToken, type) {
  // console.log("invitationToken-------------------->", token)
  const token = invitationToken
  console.log("invitation=--=-=-=-=-=-=-=-", invitationToken)
  if (!token) {
    throw new Error('No access token found');
  }
  const { JWT_SECRET_KEY = '' } = process.env;
  try {
    const userAttrs = await verifyToken(token, JWT_SECRET_KEY);
    console.log("uersAttrs-----",userAttrs.type)
    if (!userAttrs || type !== userAttrs.type) {
      throw new Error('Invalid access token');
    }
    return userAttrs;
  } catch (error: any) {
    if (error.message === 'jwt expired') {
      throw new Error('Access token has been expired');
    }
    throw new Error('Invalid access token');
  }
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

async function verifyAndChangePassword(
  passwordParams: ChangePasswordParams,
  currentUser: UserInstance
) {
  const isPasswordMatched = bcrypt.compareSync(
    passwordParams.current_password,
    currentUser.encrypted_password
  );
  if (!isPasswordMatched) {
    throw new Error('Invalid current_password');
  }
  return currentUser.update({ ...passwordParams });
}

export {
  sendResetPasswordInstruction,
  verifyAndResetPassword,
  verifyAndChangePassword
};

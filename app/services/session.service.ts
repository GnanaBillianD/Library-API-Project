import { UserInstance } from '../types';
import {
  JwtResetTokenUserAttributes,
  LoginServiceParams
} from '../types/session.controller';
import models from '../models';
import bcrypt from 'bcrypt';
import { sign as jwtSignin, verify as jwtVerify } from 'jsonwebtoken';
import { SessionError } from '../exceptions';
import { EmptyResultError } from 'sequelize';

const { User } = models;

async function signin(attrs: LoginServiceParams) {
  let currentUser: UserInstance;
  try {
    currentUser = await getConfirmedUserByEmail(attrs.email);
  } catch (error) {
    throw new SessionError('Invalid email or password');
  }
  validatePassword(currentUser, attrs.password);
  const accessToken = await markSignin(currentUser, attrs);
  return accessToken;
}

function getConfirmedUserByEmail(attrsEmail: string): Promise<UserInstance> {
  return User.findOne({
    where: { email: attrsEmail }
  }).then((user: UserInstance | null) => {
    if (user) {
      return user;
    }
    throw new EmptyResultError('User not found');
  });
}

function validatePassword(currentUser: UserInstance, password: string) {
  const isPasswordMatched = bcrypt.compareSync(
    password,
    currentUser.encrypted_password
  );
  if (!isPasswordMatched) {
    throw new SessionError('Invalid email or password');
  }
}

async function markSignin(user: UserInstance, attrs: LoginServiceParams) {
  const { email } = user;
  const { JWT_SECRET_KEY } = process.env;
  const token = jwtSignin({ email }, JWT_SECRET_KEY, { expiresIn: 180000 });
  await User.update(
    { access_token: token },
    {
      where: {
        email: user.email
      }
    }
  );
  return token;
}

function markLogout(user: UserInstance) {
  // console.log('-----------------logout------------', user);
  return User.update(
    { access_token: null },
    {
      where: {
        email: user.email
      }
    }
  );
}

function verifyToken(
  token: string,
  secretKey: string
): Promise<JwtResetTokenUserAttributes> {
  console.log('token is======================?', token);
  console.log('key is=========================?', secretKey);

  return new Promise((resolve, reject) =>
    jwtVerify(
      token,
      secretKey,
      (err: string, decoded: JwtResetTokenUserAttributes) => {
        if (err) {
          reject(err);
        } else {
          console.log('log=-==================?');
          resolve(decoded);
        }
      }
    )
  );
}

export { signin, markLogout, verifyToken };

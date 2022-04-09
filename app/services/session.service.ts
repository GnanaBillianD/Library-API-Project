import { UserInstance } from '../models/user';
import { LoginServiceParams } from '../types/session.controller';
import models from '../models';
import bcrypt from 'bcrypt';
import { sign as jwtSignin } from 'jsonwebtoken';

const { User } = models;

async function signin(attrs: LoginServiceParams) {
  let currentUser: UserInstance;
  try {
    currentUser = await getConfirmedUserByEmail(attrs.email);
    validatePassword(currentUser, attrs.password);
    const accessToken = await markSignin(currentUser, attrs);
    return accessToken;
  } catch (error) {
    throw new Error('Invalid email or password');
  }
}

function getConfirmedUserByEmail(attrsEmail: string): Promise<UserInstance> {
  return User.findOne({
    where: { email: attrsEmail }
  }).then((user: UserInstance | null) => {
    if (user) {
      return user;
    }
    throw new Error('User not found');
  });
}

function validatePassword(currentUser: UserInstance, password: string) {
  const isPasswordMatched = bcrypt.compareSync(
    password,
    currentUser.encrypted_password
  );
  if (!isPasswordMatched) {
    throw new Error('Invalid email or password');
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

export default signin;

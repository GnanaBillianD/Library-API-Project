import { UserCreationAttributes, UserInstance } from '../types';
import models from '../models';
import bcrypt from 'bcrypt';
import { sendInvitationLink } from './mailer.service';
import { sign as jwtSignin } from 'jsonwebtoken';
import { TOKEN_TYPE } from '../config/constants';

const { UserInstance } = models;

const { User } = models;

function sendUserInvitation(user: UserInstance) {
  const { JWT_SECRET_KEY = '' } = process.env;
  const { id, email } = user;
  const token = jwtSignin(
    { id, email, type: TOKEN_TYPE.resetPassword },
    JWT_SECRET_KEY,
    {
      expiresIn: 6000
    }
  );
  sendInvitationLink(user, token);
}

async function create(attributes) {
  const user = await User.findOne({
    where: { email: attributes.superAdmin.email }
  });
  if (user) {
    throw new Error('this user email already exist');
  }
  const users = await User.create(attributes.superAdmin).then((user) => {
    sendUserInvitation(user);
    return user;
  });
}

function list() {
  return User.findAll();
}

async function getById(id) {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    throw new Error('user not found');
  }
  return user;
}

async function update(id, params) {
  const user = await User.findOne({ where: { id } });
  const users = await User.findOne({
    where: { email: params.superAdmin.email }
  });
  if (!user) {
    throw new Error('User not found');
  }
  if (users) {
    throw new Error('this user email already exist');
  }
  return user.update(params.superAdmin);
}

async function destoryById(id) {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }
  return user.destory;
}

export { create, list, update, getById, destoryById };

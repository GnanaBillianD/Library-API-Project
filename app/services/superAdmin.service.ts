import { UserInstance } from '../types';
import models from '../models';
import { sendInvitationLink } from './mailer.service';
import { sign as jwtSignin } from 'jsonwebtoken';
import { TOKEN_TYPE } from '../config/constants';
import { EmptyResultError } from 'sequelize';

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
  console.log('user????????????', user);
  sendInvitationLink(user, token);
}
//
async function create(attributes) {
  const user = await User.findOne({
    where: { email: attributes.users.email }
  });
  if (user) {
    throw new Error('this user email already exist');
  }
  await User.create(attributes.users).then((user) => {
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
    throw new EmptyResultError('user not found');
  }
  return user;
}

async function update(id, params) {
  const user = await User.findOne({ where: { id } });
  const users = await User.findOne({
    where: { email: params.superAdmin.email }
  });
  if (!user) {
    throw new EmptyResultError('User not found');
  }
  if (users) {
    throw new Error('this user email already exist');
  }
  return user.update(params.superAdmin);
}

async function destoryById(id) {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    throw new EmptyResultError('User not found');
  }
  return user.destory;
}

export { create, list, update, getById, destoryById };

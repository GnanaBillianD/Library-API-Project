import { UserCreationAttributes } from '../types';
import models from '../models';
import bcrypt from 'bcrypt';

const { User } = models;

async function create(attributes) {
  const user = await User.findOne({ where: { email: attributes.email } });
  if (user) {
    throw new Error('this user email already exist');
  }
  const users= await User.create(attributes);
  await users.update({
    encrypted_password: bcrypt.hashSync(users.encrypted_password, 10)
  });
  return users
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

async function update(id, params: UserCreationAttributes) {
  const user = await User.findOne({ where: { id } });
  const users = await User.findOne({ where: { email: params.email } });
  if (!user) {
    throw new Error('User not found');
  }
  if (users) {
    throw new Error('this user email already exist');
  }
  return user.update(params);
}

async function destoryById(id) {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }
  return user.destory;
}

export { create, list, update, getById, destoryById };

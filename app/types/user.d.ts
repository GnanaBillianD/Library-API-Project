import { Model } from 'sequelize';

export const enum USER_ROLE {
  SUPER_ADMIN = 'Super Admin',
  USER = 'User'
}

export interface UserAttributes {
  id: bigint;
  name: string;
  role: string;
  email: string;
  encrypted_password: string;
}

export type UserCreationAttributes = Pick<
  UserAttributes,
  'name' | 'role' | 'email' | 'encrypted_password'
>;

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
  isSuperAdmin(): boolean;
  isParkAdmin(): boolean;
  isConsumer(): boolean;
}

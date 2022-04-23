import { Model, BuildOptions } from 'sequelize';

export const enum USER_ROLE {
  SUPER_ADMIN = 'Super Admin',
  USER = 'User'
}

export interface UserAttributes {
  id: bigint;
  name: string;
  role: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  encrypted_password: string;
}

export type UserCreationAttributes = Pick<
  UserAttributes,
  'name' | 'role' | 'email' | 'encrypted_password'
>;

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  isSuperAdmin(): boolean;
}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
};

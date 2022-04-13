'use strict';
import { DataTypes, Model, Sequelize, ModelDefined } from 'sequelize';
import {
  UserAttributes,
  UserCreationAttributes,
  USER_ROLE
} from '../types/user';
import bcrypt from 'bcrypt';

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  isSuperAdmin(): boolean;
  isParkAdmin(): boolean;
  isConsumer(): boolean;
}

type UserModelDefined = ModelDefined<UserAttributes, UserCreationAttributes>;

function User(sequelize: Sequelize): UserModelDefined {
  const user = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      encrypted_password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: true,
        validate: {
          isValidate: function (
            this: UserInstance,
            password: string,
            next: (err?: string) => void
          ) {
            if (password) {
              if (password !== this.password_confirmation) {
                return next("Password confirmation doesn't match password");
              }
            }
            next();
          }
        },
        set(this: UserInstance, val: string) {
          if (!!val) {
            this.setDataValue('password', val),
              this.setDataValue('encrypted_password', bcrypt.hashSync(val, 10));
          }
        }
      },
      password_confirmation: {
        type: DataTypes.VIRTUAL
      },
      access_token: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'users',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  ) as UserModelDefined;

  user.prototype.isSuperAdmin = function (): boolean {
    return this.role === USER_ROLE.SUPER_ADMIN;
  };

  return user;
}
export default User;

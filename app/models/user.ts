'use strict';
import { DataTypes, Sequelize } from 'sequelize';
import { UserInstance, UserStatic, USER_ROLE } from '../types/users';
import {
  isEmailUnique,
  isValidPassword
} from './validation/user.model.validators';
import bcrypt from 'bcrypt';

// type UserModelDefined = ModelDefined<UserAttributes, UserCreationAttributes>;

function User(sequelize: Sequelize): UserStatic {
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
        type: new DataTypes.STRING(),
        allowNull: false,
        validate: {
          isEmailUnique,
          isEmail: {
            // args: true,
            msg: 'Invalid email'
          },
          len: {
            args: [1, 100] as readonly [number, number],
            msg: 'Email length should be 1 to 100 characters'
          },
          notNull: {
            // args: true,
            msg: 'Email cannot be empty'
          }
        }
      },
      encrypted_password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: true,
        validate: {
          isValidPassword
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
  ) as UserStatic;

  user.prototype.isSuperAdmin = function (): boolean {
    return this.role === USER_ROLE.SUPER_ADMIN;
  };

  return user;
}
export default User;

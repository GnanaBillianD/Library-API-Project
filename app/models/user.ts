'use strict';
import { DataTypes, Model, Sequelize,ModelDefined } from "sequelize";
import { UserAttributes, UserCreationAttributes } from "../types/user";

export interface UserInstance 
extends Model<UserAttributes, UserCreationAttributes>,
UserAttributes {
  isSuperAdmin(): boolean;
  isParkAdmin(): boolean;
  isConsumer(): boolean;
}

type UserModelDefined = ModelDefined <UserAttributes, UserCreationAttributes>;

function User(sequelize: Sequelize): UserModelDefined {
  return sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      encrypted_password: {
        type: DataTypes.STRING,
        allowNull: false
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
}
export default User;
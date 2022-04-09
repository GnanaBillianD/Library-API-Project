'use strict';
import { DataTypes, Model, Sequelize, ModelDefined } from 'sequelize';
import { BookAttributes, BookCreationAttributes } from '../types/book';

export interface BookInstance
  extends Model<BookAttributes, BookCreationAttributes>,
    BookAttributes {}

type BookModelDefined = ModelDefined<BookAttributes, BookCreationAttributes>;

function Book(sequelize: Sequelize): BookModelDefined {
  return sequelize.define(
    'Book',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true
      },
      amount: {
        type: DataTypes.NUMBER,
        allowNull: true
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'books',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  ) as BookModelDefined;
}
export default Book;

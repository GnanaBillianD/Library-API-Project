'use strict';
import { DataTypes, Sequelize } from 'sequelize';
import { BookStatic } from '../types/book';
import { isNameUnique } from './validation/book.model.validators';

// type BookModelDefined = ModelDefined<BookAttributes, BookCreationAttributes>;

function Book(sequelize: Sequelize): BookStatic {
  return sequelize.define(
    'Book',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNameUnique
        }
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
        type: DataTypes.DECIMAL(10, 2),
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
  ) as BookStatic;
}
export default Book;

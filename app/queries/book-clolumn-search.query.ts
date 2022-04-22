import { text } from 'node:stream/consumers';
import Sequelize from 'sequelize';
import { BookListQUeryParams } from '../types/books.controller';

const { Op } = Sequelize;

const columnSearchQuery = (query: BookListQUeryParams) => {
  const { id, name, category, author, amount, notes } = query;
  const text = query.q;//?
  const searchQueries: any = [];

  if (id !== null && typeof id !== 'undefined') {
    const idQuery = Sequelize.where(
      Sequelize.cast(Sequelize.col('Book.id'), 'varchar'),
      {
        [Op.iLike]: `${text}%`
      }
    );
    searchQueries.push(idQuery);
  }

  if (name) {
    const nameQuery = { name: { [Op.iLike]: `${name}%` } };
    searchQueries.push(nameQuery);
  }

  if (category) {
    const categoryQuery = { category: { [Op.iLike]: `${category}%` } };
    searchQueries.push(categoryQuery);
  }

  if (author) {
    const authorQuery = { author: { [Op.iLike]: `${author}%` } };
    searchQueries.push(authorQuery);
  }

  if (amount !== null && typeof amount !== 'undefined') {
    const amountQuery = Sequelize.where(
      Sequelize.cast(Sequelize.col('Book.amount'), 'varchar'),
      {
        [Op.iLike]: `%${text}%`
      }
    );
    searchQueries.push(amountQuery);
  }

  if (notes) {
    const notesQuery = { notes: { [Op.iLike]: `${notes}%` } };
    searchQueries.push(notesQuery);
  }

  const result = {
    [Op.and]: [searchQueries]
  };
  return result;
};

export default columnSearchQuery;

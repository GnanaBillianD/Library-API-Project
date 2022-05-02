import { Op, Sequelize } from 'sequelize';
import { BookListQUeryParams } from '../types/books.controller';

const globalSearchQuery = (query: BookListQUeryParams) => {
  const text = query.q;
  const searchQueries: any = [];

  const idQuery = Sequelize.where(
    Sequelize.cast(Sequelize.col('Book.id'), 'varchar'),
    {
      [Op.iLike]: `${text}%`
    }
  );
  searchQueries.push(idQuery);

  searchQueries.push({
    name: { [Op.iLike]: `%${text}%` }
  });

  searchQueries.push({
    category: { [Op.iLike]: `%${text}%` }
  });

  searchQueries.push({
    author: { [Op.iLike]: `%${text}%` }
  });

  const amountQuery = Sequelize.where(
    Sequelize.cast(Sequelize.col('Book.amount'), 'varchar'),
    {
      [Op.iLike]: `%${text}%`
    }
  );
  searchQueries.push(amountQuery);

  searchQueries.push({
    notes: { [Op.iLike]: `%${text}%` }
  });

  const result = {
    [Op.or]: searchQueries
  };
  return result;
};
export default globalSearchQuery;

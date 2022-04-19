import { BookCreationAttributes, BookInstance } from '../types';
import models from '../models';
import {
  BookListQUeryParams,
  BookRowsAndCount
} from '../types/books.controller';
import { size, map } from 'lodash';
import { Q_MINIMUM_SIZE } from '../config/constants';
import { globalSearchQuery } from '../queries/book-global-search.query';
import columnSearchQuery from '../queries/book-clolumn-search.query';
import { paginate } from '../lib/paginator-result';
import { paginatorResult } from '../lib/paginator-result';
import { EmptyResultError } from 'sequelize';

const { Book } = models;

async function create(attributes: BookCreationAttributes) {
  const book = await Book.findOne({ where: { name: attributes.name } });
  if (book) {
    throw new Error('this book name already exist');
  }
  return Book.create(attributes);
}

function listAndPaginate(query: BookListQUeryParams) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries =
    size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query) : {};
  const columnQuery = columnSearchQuery(query);
  return Book.findAndCountAll({
    limit,
    offset,
    where: { ...queries, ...columnQuery }
  }).then((book: BookRowsAndCount) => {
    const rowsAndCounts = {
      count: book.count,
      rows: book.rows
    };
    const result = paginate(rowsAndCounts, perPage, page);
    return paginatorResult(result, 'book');
  });
}

async function getById(id) {
  const book = await Book.findOne({ where: { id } });
  if (!book) {
    throw new EmptyResultError('Book not found');
  }
  return book;
}

async function update(id, params: BookCreationAttributes) {
  const book = await Book.findOne({ where: { id } });
  const books = await Book.findOne({ where: { name: params.name } });
  if (!book) {
    throw new EmptyResultError('Book not found');
  }
  if (books) {
    throw new Error('this book name already exist');
  }
  return book.update(params);
}

async function destoryById(id) {
  const book = await Book.findOne({ where: { id } });
  if (!book) {
    throw new EmptyResultError('Book not found');
  }
  return book.destory;
}

export { create, listAndPaginate, update, getById, destoryById };

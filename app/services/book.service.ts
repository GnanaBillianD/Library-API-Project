import { BookCreationAttributes, BookInstance } from '../types';
import models from '../models';
import {
  BookListQUeryParams,
  BookRowsAndCount
} from '../types/books.controller';
import { size, map, isEqual, some } from 'lodash';
import { BOOK_BULK_UPLOAD_HEADERS, Q_MINIMUM_SIZE } from '../config/constants';
import globalSearchQuery from '../queries/book-global-search.query';
import columnSearchQuery from '../queries/book-clolumn-search.query';
import { paginate } from '../lib/paginator-result';
import { paginatorResult } from '../lib/paginator-result';
import { EmptyResultError, Sequelize } from 'sequelize';
import util from 'util';
import { pipeline } from 'stream';
import { createWriteStream, unlinkSync } from 'fs';
import readXlsxFile from 'read-excel-file/node';
import BulkUploadError from '../exceptions/bulk-upload-error';

const pump = util.promisify(pipeline);
const { Book } = models;

const env = process.env.NODE_ENV || 'development';
// tslint:disable-next-line: no-var-requires
const config = require(`${__dirname}/../../db/config.json`)[env];

const db = new Sequelize(process.env[config.use_env_variable] as string);

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

async function bookBulkUpload(attrs) {
  console.log('attrs================>', attrs);
  const { mimetype: fileType } = attrs;
  if (!(fileType.includes('excel') || fileType.includes('spreadsheetml'))) {
    throw new Error('Kindly upload only excel file');
  }
  const fileName = `${new Date().getTime()}.xlsx`;
  const filePath = `${__dirname}/../assets/books/${fileName}`;

  const t = await db.transaction();
  // const t = await db.sequelize.transaction();

  try {
    await pump(attrs.file, createWriteStream(filePath));

    const bookList = await readXlsxFile(filePath);
    if (!(size(bookList) > 1)) {
      throw new Error('Kindly provide books data');
    }

    const bulkUpdloadHeaders = BOOK_BULK_UPLOAD_HEADERS;

    const bookListHeaders = bookList[0];

    if (!isEqual(bulkUpdloadHeaders, bookListHeaders)) {
      throw new Error(
        'Invalid template in excel file. Kindly upload the file with valid column name'
      );
    }
    bookList.shift();

    const books: any = [];
    const allBooks = map(bookList, async (row, index: number) => {
      const id = index + 1;
      const name = row[0];
      const category = row[1];
      const author = row[2];
      const amount = row[3];
      const notes = row[4];

      const attributes = {
        id,
        name,
        category,
        author,
        amount,
        notes
      };
      books.push(attributes);
      await Book.update(attributes, { transaction: t });
      await t.commit();
      unlinkSync(filePath);
      await Promise.all(allBooks);
    });
  } catch (error) {
    await t.rollback();
    unlinkSync(filePath);
    throw new BulkUploadError(error);
  }
}

async function destoryById(id) {
  const book = await Book.findOne({ where: { id } });
  if (!book) {
    throw new EmptyResultError('Book not found');
  }
  return book.destory;
}

export {
  create,
  listAndPaginate,
  update,
  getById,
  destoryById,
  bookBulkUpload
};

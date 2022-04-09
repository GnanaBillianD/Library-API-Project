import { BookCreationAttributes } from '../types';
import models from '../models';

const { Book } = models;

async function create(attributes: BookCreationAttributes) {
  const book = await Book.findOne({ where: { name: attributes.name } });
  if(book){
    throw new Error('this book name already exist');
  }
  return Book.create(attributes);
}

function list() {
  return Book.findAll();
}

async function getById(id) {
  const book = await Book.findOne({ where: { id } });
  if (!book) {
    throw new Error('Book not found');
  }
  return book;
}

async function update(id, params: BookCreationAttributes) {
  const book = await Book.findOne({ where: { id } });
  const books = await Book.findOne({ where: { name: params.name } });
  if (!book) {
    throw new Error('Book not found');
  }
  if(books){
    throw new Error('this book name already exist');
  }
  return book.update(params);
}

async function destoryById(id) {
  const book = await Book.findOne({ where: { id } });
  if (!book) {
    throw new Error('Book not found');
  }
  return book.destory;
}

export { create, list, update, getById, destoryById };

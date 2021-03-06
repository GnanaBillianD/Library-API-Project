import { BuildOptions, Model } from 'sequelize';

export interface BookAttributes {
  id: bigint;
  name: string;
  category: string;
  author: string;
  amount: number;
  notes: string;
  created_at: Date;
  updated_at: Date;
}

export type BookCreationAttributes = Pick<
  BookAttributes,
  'name' | 'author' | 'category' | 'amount' | 'notes'
>;

export interface BookInstance
  extends Model<BookAttributes, BookCreationAttributes>,
    BookAttributes {}

export type BookStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): BookInstance;
};

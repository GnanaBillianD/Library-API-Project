export interface BookAttributes {
  id: bigint;
  name: string;
  category: string;
  author: string;
  amount: number;
  notes: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export type BookCreationAttributes = Pick<
  BookAttributes,
  'name' | 'author' | 'category' | 'amount' | 'notes'
>;

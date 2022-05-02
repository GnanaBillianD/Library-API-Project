import { BookInstance } from '../types';

export interface BookListQUeryParams {
  q?: string;
  page?: number;
  per_page?: number;
  id?: number;
  name?: string;
  category?: string;
  author?: string;
  amount?: number;
  notes?: string;
}

export interface BookRowsAndCount {
  count: number;
  rows: BookInstance[];
}

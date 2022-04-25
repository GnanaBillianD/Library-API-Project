import { Op } from 'sequelize';
import { BookInstance, BookStatic } from '../../types';

export function isNameUnique(
  this: BookInstance,
  name: string,
  next: (err?: string) => void
) {
  if (name) {
    const model = this.constructor as BookStatic;
    model
      .findOne({ where: { name: { [Op.iLike]: name } } })
      .then((result: unknown) => {
        if (result) {
          return next('Name already exist');
        }
        return next();
      })
      .catch(() => next());
  } else {
    return next();
  }
}

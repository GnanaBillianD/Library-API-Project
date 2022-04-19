import { Op } from 'sequelize';
import { UserInstance, UserStatic } from '../../types';

export function isEmailUnique(
  this: UserInstance,
  email: string,
  next: (err?: string) => void
) {
  if (email) {
    const model = this.constructor as UserStatic;
    model
      .findOne({ where: { email: { [Op.iLike]: email } } })
      .then((result: unknown) => {
        if (result) {
          return next('Email already exist');
        }
        return next();
      })
      .catch(() => next());
  } else {
    return next();
  }
}

export function isValidPassword(
  this: UserInstance,
  password: string,
  next: (err?: string) => void
) {
  if (password) {
    if (password !== this.password_confirmation) {
      return next("Password confirmation doesn't match password");
    }
  }
  next();
}

import boom from '@hapi/boom';
import { config } from '@config/config';
import { Request, Response, NextFunction } from 'express';
import { User } from '@entities/user.entity';
import { UserRole } from '../types/user.types';

export const checkApiKey = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line dot-notation
  const apikey = req.headers['api'];

  if (apikey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
};

export const checkRoles = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (roles.includes(user.role as UserRole)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
};

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '@config/config';
import { User } from '@entities/user.entity';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as User;
    if (!user) throw Error('El usuario no existe');
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);

    res.json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

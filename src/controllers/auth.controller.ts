import { Request, Response, NextFunction } from 'express';
import { User } from '../types/user.types';
import AuthService from '@services/auth.service';

const authService = new AuthService();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as User;

    res.json(authService.signToken(user));
  } catch (error) {
    next(error);
  }
};

export const recover = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const response = await authService.sendRecovery(email);

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, newPassword } = req.body;
    const response = await authService.changePassword(token, newPassword);

    res.json(response);
  } catch (error) {
    next(error);
  }
};

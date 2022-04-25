import { Request, Response, NextFunction } from 'express';

export const logErrors = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log('logerrors');
  console.error(err);
  next(err);
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

export const boomErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.isBoom) {
    const { output } = err;

    res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

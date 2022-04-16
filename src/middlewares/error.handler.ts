export const logErrors = (err: any, _req: any, _res: any, next: any) => {
  console.log('logerrors');
  console.error(err);
  next(err);
};

export const errorHandler = (err: any, _req: any, res: any, _next: any) => {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

export const boomErrorHandler = (err: any, _req: any, res: any, next: any) => {
  if (err.isBoom) {
    const { output } = err;

    res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

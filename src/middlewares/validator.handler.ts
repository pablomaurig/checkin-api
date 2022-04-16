import boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const validatorHandler = (schema: ObjectSchema, property: any) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    // @ts-expect-error: revisar este type
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(JSON.stringify(error.message)));
    }
    next();
  };
};

export default validatorHandler;

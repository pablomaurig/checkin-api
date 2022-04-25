import boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

type Property = 'body' | 'params';

const validatorHandler = (schema: ObjectSchema, property: Property) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(JSON.stringify(error.message)));
    }
    next();
  };
};

export default validatorHandler;

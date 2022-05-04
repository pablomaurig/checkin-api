import { Request, Response, NextFunction } from 'express';
import EmployeesService from '@services/employee.service';

const service = new EmployeesService();

export const getEmployees = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await service.getEmployees();

        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      const id = await service.createEmployee({ email, password, firstName, lastName });
  
      res.json(id);
    } catch (error) {
      next(error);
    }
};
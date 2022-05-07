import boom from '@hapi/boom';
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

    const employee = await service.getEmployeeByEmail(email);

    if (!employee) {
      const id = await service.createEmployee({
        email,
        password,
        firstName,
        lastName,
      });
      res.json(id);
    } else {
      throw boom.notFound('Employee already exists');
    }
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const employee = await service.deleteEmployee(parseInt(id));

    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await service.updateEmployee(parseInt(id), req.body);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

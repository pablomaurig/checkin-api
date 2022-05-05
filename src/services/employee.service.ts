import boom from '@hapi/boom';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '../entities/user.entity';
import { hashPassword } from '@utils/hash';
import {
  User as UserInterface,
  CreateEmployee,
  UserRole,
} from '../types/user.types';

class EmployeeService {
  async getEmployees() {
    const employees = await User.find();

    return employees
      .filter(employee => {
        return employee.role === UserRole.EMPLOYEE;
      })
      .map(employee => ({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        role: employee.role,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
      }));
  }

  async createEmployee(body: CreateEmployee) {
    const { email, password, firstName, lastName } = body;
    const hash = await hashPassword(password);

    const employee = new User();
    employee.email = email;
    employee.password = hash;
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.role = UserRole.EMPLOYEE;

    await employee.save();

    return employee.id;
  }

  async getEmployeeByEmail(email: string) {
    const employee = await User.findOneBy({
      email: email,
    });

    return employee;
  }

  async deleteEmployee(id: number) {
    const employee = await User.findOneBy({ id: id });

    if (!employee || employee.role !== UserRole.EMPLOYEE) {
      throw boom.notFound('Employee does not exists');
    }

    await employee.remove();

    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      role: employee.role,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    };
  }

  async updateEmployee(id: number, body: Partial<UserInterface>) {
    const employee = await User.findOneBy({ id: id });
    if (!employee || employee.role !== UserRole.EMPLOYEE) {
      throw boom.notFound('Employee does not exists');
    }

    const updateEmployee = { ...body, updatedAt: new Date() };

    await User.update(
      { id: id },
      updateEmployee as QueryDeepPartialEntity<User>
    );

    const updatedEmployee = await User.findOneBy({ id: id });

    return {
      id: updatedEmployee?.id,
      firstName: updatedEmployee?.firstName,
      lastName: updatedEmployee?.lastName,
      email: updatedEmployee?.email,
      role: updatedEmployee?.role,
      createdAt: updatedEmployee?.createdAt,
      updatedAt: updatedEmployee?.updatedAt,
    };
  }
}

export default EmployeeService;

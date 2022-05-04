//import boom from '@hapi/boom';
//import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '../entities/user.entity';
import { hashPassword } from '@utils/hash';
import {
  //User as UserInterface,
  CreateEmployee,
  UserRole,
} from '../types/user.types';

class EmployeeService {

    async getEmployees() {
        const users = await User.find();
    
        return users.filter((user) => {
                        return user.role === UserRole.EMPLOYEE
                      }
                    ).map(user => ({
                      id: user.id,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email, 
                      role: user.role,
                      createdAt: user.createdAt,
                      updatedAt: user.updatedAt
                    })
                  );
    }

    async createEmployee(body: CreateEmployee ) {
      const { email, password, firstName, lastName } = body;
      const hash = await hashPassword(password);
  
      const user = new User();
      user.email = email;
      user.password = hash;
      user.firstName = firstName;
      user.lastName = lastName;
      user.role = UserRole.EMPLOYEE;
  
      await user.save();
  
      return user.id;
    }

}

export default EmployeeService;
import boom from '@hapi/boom';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '../entities/user.entity';

interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  email: string;
}

export type CreateUser = Pick<UserInterface, 'email' | 'password'>;

interface UserService {
  users: UserInterface[];
}

class UserService {
  async getUsers() {
    const users = await User.find();

    return users;
  }

  async getUserById(id: number) {
    const user = await User.findOneBy({
      id: id,
    });
    if (!user) {
      throw boom.notFound('User not found');
    }

    return user;
  }

  async createUser(body: CreateUser) {
    const { email, password } = body;

    const user = new User();
    user.email = email;
    user.password = password;
    user.role = 'host';

    await user.save();

    return user.id;
  }

  async updateUser(id: number, body: Partial<UserInterface>) {
    const user = await User.findOneBy({ id: id });
    if (!user) {
      throw boom.notFound('User does not exists');
    }

    const updateUser = { ...body, updatedAt: new Date() };

    await User.update({ id: id }, updateUser as QueryDeepPartialEntity<User>);

    const updatedUser = await User.findOneBy({ id: id });

    return updatedUser;
  }

  async deleteUser(id: number) {
    const user = await User.findOneBy({ id: id });

    if (!user) {
      throw boom.notFound('User does not exists');
    }

    await user.remove();

    return user;
  }
}

export default UserService;

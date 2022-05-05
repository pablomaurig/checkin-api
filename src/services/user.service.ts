import boom from '@hapi/boom';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '../entities/user.entity';
import { hashPassword } from '@utils/hash';
import {
  User as UserInterface,
  CreateUser,
  UserRole,
} from '../types/user.types';

class UserService {
  async getUsers() {
    const users = await User.find();

    if (users.length === 0) throw boom.notFound('User not found');

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

  async getUserByEmail(email: string) {
    const user = await User.findOneBy({
      email: email,
    });

    return user;
  }

  async createUser(body: CreateUser) {
    const { email, password } = body;
    const hash = await hashPassword(password);

    const user = new User();
    user.email = email;
    user.password = hash;
    user.role = UserRole.CUSTOMER;

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

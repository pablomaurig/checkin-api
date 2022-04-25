/* eslint-disable no-unused-vars */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  email: string;
}

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  CUSTOMER = 'customer',
}

export type CreateUser = Pick<User, 'email' | 'password'>;

export type LogedUser = Pick<User, 'email' | 'password'>;

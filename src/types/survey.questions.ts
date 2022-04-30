/* eslint-disable no-unused-vars */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  email: string;
  recoveryToken?: string | null;
}

export enum UserRole {
  QUESTION1 = 'question1',
  QUESTION2 = 'question2',
  QUESTION3 = 'question3',
}

export type CreateUser = Pick<User, 'email' | 'password'>;

export type LogedUser = Pick<User, 'email' | 'password'>;

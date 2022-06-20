import joi from 'joi';

const id = joi.number();
const firstName = joi.string();
const lastName = joi.string();
const password = joi.string();
const email = joi.string().email();
const token = joi.string();

export const createUserSchema = joi.object({
  email: email.required(),
  password: password.required(),
});

export const loginSchema = joi.object({
  email: email.required(),
  password: password.required(),
});

export const changePasswordSchema = joi.object({
  email: email.required(),
  password: password.required(),
  token: token.required(),
  newPassword: password.required(),
});

export const updateUserSchema = joi.object({
  email: email,
  password: password,
  firstName: firstName,
  lastName: lastName,
});

export const recoverSchema = joi.object({
  email: email.required(),
});

export const getUserSchema = joi.object({
  id: id.required(),
});

export const createEmployeeSchema = joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
});

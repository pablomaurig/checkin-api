import joi from 'joi';

const id = joi.number();
const firstName = joi.string();
const lastName = joi.string();
const password = joi.string();
const email = joi.string().email();

export const createUserSchema = joi.object({
  email: email.required(),
  password: password.required(),
});

export const loginSchema = joi.object({
  email: email.required(),
  password: password.required(),
});

export const updateUserSchema = joi.object({
  firstName: firstName,
  lastName: lastName,
});

export const getUserSchema = joi.object({
  id: id.required(),
});

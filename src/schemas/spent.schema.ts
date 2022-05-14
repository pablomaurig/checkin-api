import joi from 'joi';
const id = joi.number();
const bookingId = joi.number();
const description = joi.string();
const amount = joi.number();

export const createSpentSchema = joi.object({
  bookingId: bookingId.required(),
  description: description.required(),
  amount: amount.required(),
});

export const getSpentsSchema = joi.object({
  bookingId: bookingId.required(),
});

export const deleteSpentSchema = joi.object({
  id: id.required(),
});

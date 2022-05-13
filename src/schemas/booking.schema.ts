import Joi from 'joi';
import joi from 'joi';

const id = joi.number();
const roomId = joi.number();
const bookingNumber = joi.string();
const surname = joi.string();
const startDate = joi.date();
const endDate = joi.date();
const amountGuests = joi.number();
// const checkIn = joi.date();
// const checkOut = joi.date();
// const state = joi.string();

export const createBookingSchema = joi.object({
  bookingNumber: bookingNumber.required(),
  surname: surname.required(),
  startDate: startDate.required(),
  endDate: endDate.required(),
  amountGuests: amountGuests.required(),
});

export const updateBookingSchema = joi.object({
  roomId: roomId,
  bookingNumber: bookingNumber,
  surname: surname,
  startDate: startDate,
  endDate: endDate,
  amountGuests: amountGuests,
});

export const getBookingSchema = joi.object({
  id: id.required(),
});

export const checkInSchema = joi.object({
  bookingId: id.required(),
  guests: joi
    .array()
    .items({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      gender: Joi.string().required(),
      dateOfBirth: Joi.date().required(),
      telephoneNumber: Joi.string().required(),
      country: Joi.string().required(),
      idCardFront: Joi.string().required(),
      idCardBack: Joi.string().required(),
    })
    .required(),
});

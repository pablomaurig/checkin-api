import joi from 'joi';

const id = joi.number();
const userId = joi.number();
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
  userId: userId.required(),
  guests: joi
    .array()
    .items({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      gender: joi.string().required(),
      dateOfBirth: joi.date().required(),
      telephoneNumber: joi.string().required(),
      country: joi.string().required(),
      idCardFront: joi.string().required(),
      idCardBack: joi.string().required(),
    })
    .required(),
});

export const checkOutSchema = joi.object({
  bookingId: id.required(),
});

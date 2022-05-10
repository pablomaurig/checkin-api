import joi from 'joi';

// const id = joi.number();
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

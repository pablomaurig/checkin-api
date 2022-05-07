import express from 'express';
import passport from 'passport';
import validatorHandler from '@middlewares/validator.handler';
import {
  createBookingSchema,
  updateBookingSchema,
  getBookingSchema,
} from '@schemas/booking.schema';
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookings,
  updateBooking,
} from '@controllers/booking.controller';

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),

  getBookings
);

router.get(
  '/:id',
  validatorHandler(getBookingSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  getBookingById
);

router.post('/', validatorHandler(createBookingSchema, 'body'), createBooking);

router.patch(
  '/:id',
  validatorHandler(updateBookingSchema, 'body'),
  updateBooking
);

router.delete('/:id', deleteBooking);

export default router;

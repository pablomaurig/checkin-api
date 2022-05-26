import express from 'express';
import passport from 'passport';
import { checkRoles } from '@middlewares/auth.handler';
import { UserRole } from '../types/user.types';
import validatorHandler from '@middlewares/validator.handler';
import {
  createBookingSchema,
  updateBookingSchema,
  getBookingSchema,
  checkInSchema,
  checkOutSchema,
} from '@schemas/booking.schema';
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookings,
  updateBooking,
  getBookingByNumberAndSurname,
  checkIn,
  checkOut,
} from '@controllers/booking.controller';

const router = express.Router();

router.get(
  '/bysurname/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.CUSTOMER),
  getBookingByNumberAndSurname
);

router.post(
  '/checkin/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.CUSTOMER),
  validatorHandler(checkInSchema, 'body'),
  checkIn
);

router.post(
  '/checkout/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  validatorHandler(checkOutSchema, 'body'),
  checkOut
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  getBookings
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getBookingSchema, 'params'),
  getBookingById
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  validatorHandler(createBookingSchema, 'body'),
  createBooking
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  validatorHandler(updateBookingSchema, 'body'),
  updateBooking
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  deleteBooking
);

export default router;

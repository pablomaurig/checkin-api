import express from 'express';
import passport from 'passport';
import { checkRoles } from '@middlewares/auth.handler';
import { UserRole } from '../types/user.types';
import validatorHandler from '@middlewares/validator.handler';
import { createBookingSchema } from '@schemas/booking.schema';
import { createBooking } from '@controllers/booking.controller';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  validatorHandler(createBookingSchema, 'body'),
  createBooking
);

export default router;

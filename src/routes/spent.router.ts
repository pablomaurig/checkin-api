import express from 'express';
import {
  createSpentSchema,
  getSpentsSchema,
  deleteSpentSchema,
} from '@schemas/spent.schema';

import passport from 'passport';
import { checkRoles } from '@middlewares/auth.handler';
import { UserRole } from '../types/user.types';
import validatorHandler from '@middlewares/validator.handler';

import {
  createSpent,
  getSpentsByBooking,
  deleteSpent,
} from '@controllers/spent.controller';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  validatorHandler(createSpentSchema, 'body'),
  createSpent
);

router.get(
  '/:bookingId',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  validatorHandler(getSpentsSchema, 'params'),
  getSpentsByBooking
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  validatorHandler(deleteSpentSchema, 'params'),
  deleteSpent
);

export default router;

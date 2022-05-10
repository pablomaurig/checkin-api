import express from 'express';
import passport from 'passport';
import { checkRoles } from '@middlewares/auth.handler';
import { UserRole } from '../types/user.types';
import validatorHandler from '@middlewares/validator.handler';
import { createSurveySchema, getSurveySchema } from '@schemas/survey.schema';
import {
  createSurvey,
  getSurveyByBooking,
  getSurveys,
} from '@controllers/survey.controller';

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  getSurveys
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.CUSTOMER),
  validatorHandler(getSurveySchema, 'params'),
  getSurveyByBooking
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.CUSTOMER),
  validatorHandler(createSurveySchema, 'body'),
  createSurvey
);

export default router;

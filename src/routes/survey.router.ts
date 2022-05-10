import express from 'express';
import passport from 'passport';
import { checkRoles } from '@middlewares/auth.handler';
import { UserRole } from '../types/user.types';
import { getSurveys } from '@controllers/survey.controller';

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  getSurveys
);

export default router;

import express from 'express';
import passport from 'passport';
import validatorHandler from '@middlewares/validator.handler';
import {
  loginSchema,
  changePasswordSchema,
  recoverSchema,
} from '@schemas/user.schema';
import { login, recover, changePassword } from '@controllers/auth.controller';

const router = express.Router();

router.post(
  '/login',
  validatorHandler(loginSchema, 'body'),
  passport.authenticate('local', { session: false }),
  login
);

router.post(
  '/recover',
  validatorHandler(recoverSchema, 'body'),
  // passport.authenticate('local', { session: false }),
  recover
);

router.post(
  '/change-password',
  validatorHandler(changePasswordSchema, 'body'),
  // passport.authenticate('local', { session: false }),
  changePassword
);
export default router;

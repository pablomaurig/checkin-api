import express from 'express';
import passport from 'passport';
import validatorHandler from '@middlewares/validator.handler';
import { loginSchema } from '@schemas/user.schema';
import { login } from '@controllers/auth.controller';

const router = express.Router();

router.post(
  '/login',
  validatorHandler(loginSchema, 'body'),
  passport.authenticate('local', { session: false }),
  login
);

export default router;

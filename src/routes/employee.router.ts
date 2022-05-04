import express from 'express';
import passport from 'passport';
import { checkRoles } from '@middlewares/auth.handler';
import { UserRole } from '../types/user.types';
import validatorHandler from '@middlewares/validator.handler';
import {
  createEmployeeSchema,
 // updateUserSchema,
 // getUserSchema,
} from '@schemas/user.schema';
import {
  getEmployees,
  createEmployee
} from '@controllers/employee.controller';

const router = express.Router();

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(UserRole.ADMIN),
    getEmployees
);

router.post(
  '/', 
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN),
  validatorHandler(createEmployeeSchema, 'body'), 
  createEmployee
);

export default router;
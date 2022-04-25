import express from 'express';
import passport from 'passport';
import { checkRoles } from '@middlewares/auth.handler';
import { UserRole } from '../types/user.types';
import validatorHandler from '@middlewares/validator.handler';
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} from '@schemas/user.schema';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '@controllers/user.controller';

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.CUSTOMER),
  getUsers
);

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.CUSTOMER),
  getUserById
);

router.post('/', validatorHandler(createUserSchema, 'body'), createUser);

router.patch('/:id', validatorHandler(updateUserSchema, 'body'), updateUser);

router.delete('/:id', deleteUser);

export default router;

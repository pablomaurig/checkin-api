import express from 'express';
import { checkApiKey } from '@middlewares/auth.handler';
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

router.get('/', checkApiKey, getUsers);

router.get(
  '/:id',
  // checkApiKey,
  validatorHandler(getUserSchema, 'params'),
  getUserById
);

router.post('/', validatorHandler(createUserSchema, 'body'), createUser);

router.patch('/:id', validatorHandler(updateUserSchema, 'body'), updateUser);

router.delete('/:id', deleteUser);

export default router;
